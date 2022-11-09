const nameSubmitButton = document.getElementById('submitName')
const nameInput = document.getElementById('nameInput')
const URLInput = document.getElementById('URLInput')
const questionSubmitButton = document.getElementById('submitURL')
const badgeDone = document.getElementById('quizNameBadge')
const youDiv = document.getElementById('youtubeInput')
const nameDiv = document.getElementById('nameDiv')
let quizId
let questionURL

nameSubmitButton.addEventListener('click', quizSubmitHandler)
questionSubmitButton.addEventListener('click', questionSubmitHandler)

async function quizSubmitHandler(event) {

    console.log('click')
    console.log(nameInput.value)
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
                console.log(res)
                quizId = res.id
                console.log(quizId)
                nameDiv.append(quiz_title)
            })
    }
    badgeDone.classList.remove('hidden')
    nameSubmitButton.classList.add('hidden')
    document.getElementById('youtubeInput').classList.remove('hidden')
}

async function questionSubmitHandler(event) {

    console.log('click')
    console.log(URLInput.value)
    console.log(quizId)
    if (URLInput.value == '') {
        URLInput.placeholder = 'please submit a URL'
    }
    else {
        fetch('api/quiz/create-question', {
            method: 'POST',
            body: JSON.stringify({
                URL: URLInput.value,
                quiz_id: quizId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => data.json())
            .then(res => {
                console.log(res)
                questionURL = res.URL
                console.log(questionURL)
                let urlDiv = document.createElement('div')
                urlDiv.innerText = questionURL
                youDiv.append(urlDiv)
            })
        URLInput.value = ''
        document.getElementById('create-quiz').classList.remove('hidden')
    }
}

