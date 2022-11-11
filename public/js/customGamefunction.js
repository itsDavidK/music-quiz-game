const musicCardOne = document.querySelector("#music-card-one");
const musicCardTwo = document.querySelector("#music-card-two");
const loadingPage = document.querySelector("#loadingBody");
const timerEl = document.querySelector("#timer");
const resultEl = document.querySelector(".resultQuiz");
const answerButton = document.getElementsByClassName("btn-block");
const quizEl = document.getElementById('customQuiz')
const quizNum = quizEl.getAttribute("data-quiz");
var qArry = [];
var musicArry = [];
var score = 0;
var questionNum = 0;
var wrong = 0;
var gameover = false;
var timer = 0;

// timer function every time when they come back(next question) it starts from
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

// get random music
function getMusic() {
    fetch(`/api/quiz/${quizNum}`)
        .then(response => {
            return response.json();
        }).then(data => {
            for(let i = 0; i < data.Questions.length; i++) {
                qArry.push(data.Questions[i].URL);
            }
            twoNumber();
        })
}

// getting random two number
function twoNumber() {
    const ranNum = Math.floor(Math.random() * qArry.length);
    console.log(qArry)
    getViews(qArry[ranNum])
    qArry.splice(ranNum, 1)
    
    console.log(ranNum)
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
            console.log(musicArry)
            checkingTwoItems();
        })
        .catch(err => console.log(err));
}

// with the two items in the array screen set up and answer setting 
function checkingTwoItems() {
    if (musicArry.length < 2) {
        twoNumber();
    } else {
        if (gameover) {
            storescore()
        } else {
            countDown();
            loadingPage.style.display = "none"
            document.querySelector(".gamefunction").classList.remove("hidden");

            const musicOne = musicArry[0];
            const musicTwo = musicArry[1];

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

// with the answer they are showing the result on the page and stop the timer 
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

    if (qArry.length != 0) {
        start();
        loadingPage.style.display = "flex"
    } else {
        storescore();
    }
}

// Post the score to the data base 
async function storescore() {
    document.querySelector(".gamefunction").classList.add("hidden");
    document.querySelector(".gamedone").classList.remove("hidden");
    document.querySelector("#scoredisplay").innerHTML = (`${score} /${wrong+score}`)
    const response = await fetch('/api/scores/create', {
        method: 'POST',
        body: JSON.stringify({
            score: score,
            QuizId: quizNum,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    await fetch('/api/profile/current-user')
        .then(response => {
            return response.json();
        }).then(data => {
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

// looping start we need this on thie custom function because we already have whole set of URL in qArry
function start() {
    twoNumber();
    document.querySelector(".gamedone").classList.add("hidden");
    document.querySelector(".gamefunction").classList.add("hidden");
    musicArry = [];
    questionNum++;
    document.querySelector("#score").textContent = `score: ${score}`;
}

// inital start
function init() {
    document.querySelector(".gamedone").classList.add("hidden");
    document.querySelector(".gamefunction").classList.add("hidden");
    getMusic();
}

// giving button a event listener (button that we are clicking "higher")
for (let i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener('click', comparedata)
}

init();