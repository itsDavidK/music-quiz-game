var musicArry = [];
var score = 0;

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
            console.log(response.result);
            return musicArry.push(response.result);
        })
        .catch(err => console.error(err));
}

// inital start
async function init() {
    try {
        musicArry = [];
        getRanMusic();
        getRanMusic();
        console.log(musicArry)
        var musicOne = musicArry[0];
        var musicTwo = musicArry[1];

        if (musicOne.id === musicTwo.id) {
            getRanMusic();
            musicTwo = musicArry[2];
        }

    } catch {
        console.log(err)
    }
}

init();