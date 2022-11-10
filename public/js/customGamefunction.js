var quizEl = document.getElementById('customQuiz')
var quizNum = quizEl.getAttribute('data-quiz');
const musicCardOne = document.querySelector("#music-card-one");
const musicCardTwo = document.querySelector("#music-card-two");
var answerButton = document.getElementsByClassName("btn-block");
var musicArry = [];
var qArry = [];
var score = 0;
var questionNum = 0;
var wrong = 0;

function getMusic() {
    fetch(`/api/quiz/${quizNum}`)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
            for(let i = 0; i < data.questions.length; i++) {
                qArry.push(data.questions[i].URL);
            }
        })
}

function gettingrandom() {
    const ranNum = Math.floor(Math.random() * qArry.length)
    getViews(qArry[ranNum])
    console.log(qArry)
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
            console.log(response)
            checkingTwoItems();
        })
        .catch(err => console.log(err));
}

function checkingTwoItems() {
    if (musicArry.length < 2) {
        gettingrandom();
    } else {
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

function comparedata(event) {
    const element = event.target;
    const answerData = element.getAttribute('data-view');
    if (answerData == "true") {
        score++;
        console.log("right")
    }

    if (answerData == "false") {
        wrong++;
        console.log("worng");
    }

    if (quesionNum < 2) {
        init();
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
            quiz_id: null,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    await fetch('/api/users/current-user')
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
            const upRight = score + data.profile.userRight
            const upWrong = wrong + data.profile.userWrong
            const uptotal = data.profile.totalGame + 1;
            fetch('/api/profile/update', {
                method: 'PUT',
                body: JSON.stringify({
                    username: data.username,
                    userRight: upRight,
                    userWrong: upWrong,
                    totalGame: uptotal
                }),
                headers: { 'Content-Type': 'application/json' },
            })
        })
}

// inital start
function start() {
    document.querySelector("#score").textContent = `score: ${score}`;
    musicArry = [];
    questionNum++;
    gettingrandom();
}

function init() {
    document.querySelector(".gamedone").classList.add("hidden");
    getMusic();
    start();
}

// for (let i = 0; i < answerButton.length; i++) {
//     answerButton[i].addEventListener('click', comparedata)
// }

init();