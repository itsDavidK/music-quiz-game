
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

const timerEl = document.querySelector("#timer");
const musicCardOne = document.querySelector("#music-card-one");
const musicCardTwo = document.querySelector("#music-card-two");
var answerButton = document.getElementsByClassName("btn-block");
const loadingPage = document.querySelector("#loadingBody");
const resultEl = document.querySelector(".resultQuiz");
var musicArry = [];
var score = 0;
var questionNum = 0;
var wrong = 0;
var gameover = false;
var timer = 0;


// timer for the game each question has 15 sec
function countDown() {
    timer = 15;
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
    goToGame()
})
start.addEventListener('click', () => {
    goToGame()
    role = 'host'
    socket.emit('start-game-host', role)
    init();
})

function goToGame() {
    names.classList.add('hidden')
    game.classList.remove('hidden')
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
    if (musicArry.length < 2) {
        getRanMusic();
    } else {
        if (role === 'host') {
            socket.emit('send-vids', musicArry)
        }
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

function clickevent(event) {
    const element = event.target;
    answerData = element.getAttribute('data-view');
}

function comparedata() {

    if (answerData == "true") {
        score++;
        console.log("right")
    }

    if (answerData == "false") {
        wrong++;
        console.log("worng");
    }

    if (questionNum < 10) {
        loadingPage.style.display = "flex"
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
    document.querySelector("#scoredisplay").innerHTML = (`${score} /10`)
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
    questionNum++;
    document.querySelector("#score").textContent = `score: ${score}`;
    getRanMusic();
}

socket.on('receive-vids', data => {
    document.querySelector(".gamedone").classList.add("hidden");
    document.querySelector("#score").textContent = `score: ${score}`;
    musicArry = data;
    checkingTwoItems()
})


for (let i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener('click', clickevent)
}


