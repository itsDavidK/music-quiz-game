const musicCardOne = document.querySelector("#music-card-one");
const musicCardTwo = document.querySelector("#music-card-two");
const loadingPage = document.querySelector("#loadingBody");
const timerEl = document.querySelector("#timer");
const resultEl = document.querySelector(".resultQuiz");
var answerButton = document.getElementsByClassName("btn-block");
var musicArry = [];
var score = 0;
var questionNum = 0;
var wrong = 0;
var gameover = false;
var timer = 0;

function countDown() {
    timer = 15;
    timeInterval = setInterval(function () {
        timer--;
        timerEl.textContent = timer + " seconds remaining";
        // if the time left 0 stop the counter and display the message
        if (timer === 0) {
            clearInterval(timeInterval);
            gameover = true;
            checkingTwoItems()
        }
        //setting the speed of counter
    }, 1000);
}

//get random music
function getRanMusic() {
    const requestUrl = 'https://kareoke.p.rapidapi.com/v1/song/random'

    fetch(requestUrl)
        .then(response => {
            return response.json();
        }).then(data => {
            getViews(data.youtube.url)
        })
        .catch(err => console.log(err));
}

// with the link finding video info
function getViews(musicInfo) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
        }
    };

    fetch('https://simple-youtube-search.p.rapidapi.com/video?search=' + musicInfo, options)
        .then(response => response.json())
        .then(response => {
            musicArry.push(response.result);
            checkingTwoItems();
        })
        .catch(err => console.log(err));
}

function checkingTwoItems() {
    if (musicArry.length < 2) {
        getRanMusic();
    } else {
        if (gameover) {
            storescore()
        } else {
            countDown();
            loadingPage.style.display = "none"
            document.querySelector(".gamefunction").classList.remove("hidden");
            console.log(musicArry)
            const musicOne = musicArry[0];
            const musicTwo = musicArry[1];
            console.log(musicArry[0].thumbnail.url);
            console.log(musicArry[0].description);

            document.querySelector('#musicOneImage').setAttribute("src", `${musicOne.thumbnail.url}`)
            document.querySelector('#musicTwoImage').setAttribute("src", `${musicTwo.thumbnail.url}`)

            document.querySelector('#titleOne').innerHTML = (`${musicOne.title}`)
            document.querySelector('#titleTwo').innerHTML = (`${musicTwo.title}`)

            var oneAnswer = "";
            var twoAnswer = "";

            if (musicOne.views > musicTwo.views) {
                oneAnswer = true;
                twoAnswer = false;
            } else if (musicTwo.views > musicOne.views) {
                oneAnswer = false;
                twoAnswer = true;
            } else {
                oneAnswer = true;
                twoAnswer = true;
            }
            document.querySelector('#higherOne').setAttribute("data-view", `${oneAnswer}`)
            document.querySelector('#higherTwo').setAttribute("data-view", `${twoAnswer}`)
        }
    }
}

function comparedata(event) {
    clearInterval(timeInterval);
    const element = event.target;
    const answerData = element.getAttribute('data-view');
    if (answerData == "true") {
        score++;
        resultEl.textContent = ("right")
    }

    if (answerData == "false") {
        wrong++;
        resultEl.textContent = ("wrong");
    }

    if (questionNum < 10) {
        init();
        loadingPage.style.display = "flex"
    } else {
        storescore();
    }
}

async function storescore() {
    document.querySelector(".gamefunction").classList.add("hidden");
    document.querySelector(".gamedone").classList.remove("hidden");
    document.querySelector("#scoredisplay").innerHTML = (`${score} /10`)
    const response = await fetch('/api/scores/create', {
        method: 'POST',
        body: JSON.stringify({
            score: score,
            QuizId: null,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    await fetch('/api/profile/current-user')
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
            const upRight = score + data.userRight;
            const upWrong = wrong + data.userWrong;
            const uptotal = data.totalGame + 1;
            const userid = data.UserId;
            console.log(upRight);
            console.log(upWrong);
            console.log(uptotal);

            fetch('/api/profile/update', {
                method: 'PUT',
                body: JSON.stringify({
                    id: data.id,
                    userRight: upRight,
                    userWrong: upWrong,
                    totalGame: uptotal,
                    UserId: userid,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
        }).catch(err => {
            return;
        })
}

// inital start
function init() {
    document.querySelector(".gamedone").classList.add("hidden");
    document.querySelector(".gamefunction").classList.add("hidden");
    musicArry = [];
    questionNum++;
    document.querySelector("#score").textContent = `score: ${score}`;
    getRanMusic();
}

for (let i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener('click', comparedata)
}

init();