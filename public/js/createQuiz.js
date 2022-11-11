const nameSubmitButton = document.getElementById('submitName');
const nameInput = document.getElementById('nameInput');
const URLInput = document.getElementById('URLInput');
const questionSubmitButton = document.getElementById('submitURL');
const createButton = document.getElementById("create-quiz");
const badgeDone = document.getElementById('quizNameBadge');
const youDiv = document.getElementById('youtubeInput');
const nameDiv = document.getElementById('nameDiv');
let quizId
let questionURL
let arryURL = [];

nameSubmitButton.addEventListener('click', quizSubmitHandler)
questionSubmitButton.addEventListener('click', questionSubmitHandler)
createButton.addEventListener('click', submitquizHandler)

async function quizSubmitHandler(event) {
    const quizName = nameInput.value
    if (nameInput.value == '') {
        nameInput.placeholder = 'please submit a name'
    }
    else {
        fetch('/api/quiz/create-quiz', {
            method: 'POST',
            body: JSON.stringify({
                quiz_title: quizName,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => data.json())
            .then(res => {
                quizId = res.id
                nameDiv.append(res.quiz_title)
            })
        badgeDone.classList.remove('hidden')
        nameSubmitButton.classList.add('hidden')
        document.getElementById('youtubeInput').classList.remove('hidden')
    }

}

async function questionSubmitHandler(event) {
    if (URLInput.value == '') {
        URLInput.placeholder = 'please submit a URL'
    }
    else {
        fetch('api/quiz/create-question', {
            method: 'POST',
            body: JSON.stringify({
                URL: URLInput.value,
                QuizId: quizId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => data.json())
            .then(res => {
                arryURL.push(res.URL)
                questionURL = res.URL
                console.log(arryURL)
                let urlDiv = document.createElement('div')
                urlDiv.innerText = questionURL
                youDiv.append(urlDiv)
            })
        URLInput.value = ''
        document.getElementById('create-quiz').classList.remove('hidden');
    }

    
}

function submitquizHandler() {
    if(arryURL.length%2 === 1) {
        document.querySelector(".evennumber").innerHTML= ("We need even number of URL to create your Quiz")
        return;
    } else {
        document.querySelector(".evennumber").innerHTML= ("Saved!")
        document.location.replace('/');
    }
}