const nameSubmitButton = document.getElementById('submitName')
const nameInput = document.getElementById('nameInput')
const URLInput = document.getElementById('URLInput')
const questionSubmitButton = document.getElementById('submitURL')
const badgeDone = document.getElementById('quizNameBadge')
let quizId

nameSubmitButton.addEventListener('click', quizSubmitHandler)
questionSubmitButton.addEventListener('click', questionSubmitHandler)

async function quizSubmitHandler(event) {
    event.preventDefault
    console.log('click')
    if (nameInput.value == '') {
        nameInput.placeholder = 'please submit a name'
    }
    else {
        const response = await fetch('api/quiz/create-quiz', {
            method: 'POST',
            body: JSON.stringify({
                quiz_title: nameInput.value,
            })
        })
        quizId = response.id
        badgeDone.classList.remove('hidden')
        nameSubmitButton.classList.add('hidden')
        document.getElementById('youtubeInput').classList.remove('hidden')
    }
    console.log(quizId)
}
async function questionSubmitHandler(event) {
    event.preventDefault
    console.log('click')
    if (URLInput.value == '') {
        URLInput.placeholder = 'please submit a URL'
    }
    else {
        const response = await fetch('api/quiz/create-question', {
            method: 'POST',
            body: JSON.stringify({
                URL: URLInput.value,
                quiz_id: quizId,
            })
        })
        URLInput.value = ''
        document.getElementById('create-quiz').classList.remove('hidden')
    }
}

