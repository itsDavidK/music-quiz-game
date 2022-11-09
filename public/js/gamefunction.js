const musicCardOne = document.querySelector("#music-card-one");
const musicCardTwo = document.querySelector("#music-card-two");
var answerButton = document.getElementsByClassName("btn-block");
var musicArry = [];
var score = 0;
var quesionNum = 0;

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
        .catch(err => console.error(err));
}

function checkingTwoItems() {
    if (musicArry.length < 2) {
        getRanMusic();
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
    console.log('click!')
    console.log(element)
    const answerData = element.getAttribute('data-view');
    if (answerData == "true") {
        score++;
        console.log("right")
    }
    
    if (answerData == "false") {
        console.log("worng");  
    }

    if(quesionNum < 10) {
        init();
    } else {
        document.location.replace('/');
        return;
    }  
}

// inital start
function init() {
    musicArry = [];
    quesionNum++;
    document.querySelector("#score").textContent = `score: ${score}`;
    getRanMusic();
}

for (let i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener('click', comparedata)
}
init();