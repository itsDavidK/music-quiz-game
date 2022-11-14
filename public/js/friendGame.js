
const socket = io();
const usersDiv = document.getElementById('usersDiv')
const opponentP = document.createElement('p')
const myUser = document.getElementById('myUser')
const start = document.getElementById('startGame')
const names = document.getElementById('lobbyDiv')
const game = document.getElementById('game')
let role = 'user'
let playerNum = 0
let currentPlayer = 'user'

let answerData

const customs = document.getElementsByClassName('custom-quiz-button')


const timerEl = document.querySelector("#timer");
const musicCardOne = document.querySelector("#music-card-one");
const musicCardTwo = document.querySelector("#music-card-two");
var answerButton = document.getElementsByClassName("btn-block");
const loadingPage = document.querySelector("#loadingBody");
const resultEl = document.querySelector(".resultQuiz");
let quizNum
let qArry = []
var musicArry = [];
var score = 0;
var questionNum = 0;
var wrong = 0;
var gameover = false;
var timer = 0;
let gameType = 'rand'
let custStart = 0

// timer for the game each question has 15 sec
function countDown() {
    timer = 15;
    timerEl.textContent = timer + " seconds remaining";
    timeInterval = setInterval(function () {
        timer--;
        timerEl.textContent = timer + " seconds remaining";


        // if the time left 0 stop the counter and display the message
        if (timer === 0) {
            clearInterval(timeInterval);
            comparedata()
        }
        //setting the speed of counter
    }, 1000);
}



socket.emit('player-name', myUser.textContent)
socket.on('player-list', players => {
    console.log(`list of players: ${players}`)
    playerConnectedOrDisconnected(players)
})

function playerConnectedOrDisconnected(players) {
    console.log('append')
    myUser.innerText = players
}
socket.emit('sendName', myUser.textContent)
socket.on('start-game-user', () => {
    document.querySelector(".gamefunction").classList.add("hidden");
    document.querySelector(".gamedone").classList.add("hidden"); ``
    goToGame()
})
start.addEventListener('click', () => {
    goToGame()
    role = 'host'
    socket.emit('start-game-host', role)
    init();
})

for (let i = 0; i < customs.length; i++) {
    customs[i].addEventListener('click', () => {
        role = 'host'
        socket.emit('start-game-host', role)
        console.log(this)
        quizNum = i + 1
        gameType = 'custom'
        goToGame()
        init()
    })
}



function goToGame() {
    names.classList.add('hidden')
    game.classList.remove('hidden')
}

function getMusic() {
    fetch(`/api/quiz/${quizNum}`)
        .then(response => {
            return response.json();
        }).then(data => {
            for (let i = 0; i < data.Questions.length; i++) {
                qArry.push(data.Questions[i].URL);
            }
            console.log('qArry')
            console.log(qArry)
            twoNumber();
        }).catch(err => console.error(err))
}

function twoNumber() {
    const ranNum = Math.floor(Math.random() * qArry.length);

    getViews(qArry[ranNum])
    qArry.splice(ranNum, 1)


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
        .catch(err => console.error(err));
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
    if (musicArry.length < 2 && gameType == 'rand') {
        getRanMusic();
    }
    if (musicArry.length < 2 && gameType == 'custom') {
        twoNumber()
    } else {
        if (role === 'host') {
            socket.emit('send-vids', musicArry)
        }
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

function clickevent(event) {
    const element = event.target;
    answerData = element.getAttribute('data-view');
}

function comparedata() {

    if (answerData == "true") {
        score++;
        resultEl.textContent = ("right");
    }

    if (answerData == "false") {
        wrong++;
        resultEl.textContent = ("wrong");
    }
    questionNum++;
    if (gameType == 'rand' && questionNum < 10) {
        loadingPage.style.display = "flex"
        document.querySelector(".gamefunction").classList.add("hidden");
        if (role === "host") {

            init();
        }
    }
    if (gameType == 'custom' && qArry.length != 0) {
        loadingPage.style.display = "flex"
        document.querySelector(".gamefunction").classList.add("hidden");
        if (role === "host") {

            init();
        }
    } else {
        storescore();
    }
}

async function storescore() {
    document.querySelector(".gamefunction").classList.add("hidden");
    document.querySelector(".gamedone").classList.remove("hidden");
    document.querySelector("#scoredisplay").innerHTML = (`score: ${score}`)
    const response = await fetch('/api/scores/create', {
        method: 'POST',
        body: JSON.stringify({
            score: score,
            quiz_id: null,
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

    document.querySelector("#score").textContent = `score: ${score}`;
    if (gameType === 'rand') {
        console.log(gameType)
        getRanMusic();

    }
    if (gameType === 'custom') {
        console.log(gameType)
        if (custStart == 0) {
            custStart = 1
            getMusic()

        } else {
            twoNumber()

        }
    }
}

socket.on('receive-vids', data => {
    document.querySelector(".gamedone").classList.add("hidden");
    document.querySelector(".gamefunction").classList.add("hidden");
    document.querySelector("#score").textContent = `score: ${score}`;
    musicArry = data;
    checkingTwoItems()

})


for (let i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener('click', clickevent)
}


