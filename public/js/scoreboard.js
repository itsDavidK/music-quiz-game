const listEl = document.querySelector(".liststart");
const currentId = listEl.getAttribute("data-id");
const quizNameEl = document.querySelector(".quizName");

//getting null (random game) score
function getdbScoredeafult() {
    fetch('/api/scores/default-game')
        .then(response => {
            return response.json();
        }).then(data => {
            sorting(data);
        })
}

//getting custom game score by their id
function getdbScoreId() {
    fetch(`/api/scores/${currentId}`)
        .then(response => {
            return response.json();
        }).then(data => {
            sorting(data);
            quizNameEl.textContent = data[0].Quiz.quiz_title
        });
}

// getting the highest values
function sorting(data) {
    const scoreArry = [];
    for (let i = 0; i < data.length; i++) {
        scoreArry.push(data[i].score)
    }
    const redun = [];
    scoreArry.forEach((c) => {
        if (!redun.includes(c)) {
            redun.push(c)
        }
    })
    const sorted = redun.sort(function (a, b) { return b - a })
    listing(data, sorted);
}

function listing(data, ordered) {
    const dataorder = [];
    for (let i = 0; i < ordered.length; i++) {
        for (let e = 0; e < data.length; e++) {
            if (data[e].score == ordered[i]) {
                dataorder.push(data[e])
            }
        }
    }
    rendering(dataorder)
}

function rendering(data) {
    let printing = `<tr>
    <td>${(1)}</td>
    <td>${data[0].User.username}</td>
    <td>${data[0].score}</td>
    </tr>`
    let number = 1
    for (let i = 1; i < data.length; i++) {
        if (data[i].score == data[(i - 1)].score) {
            printing = printing + `<tr>
        <td>${(number)}</td>
        <td>${data[i].User.username}</td>
        <td>${data[i].score}</td>
        </tr>`
        } else {
            number++;
            printing = printing + `<tr>
        <td>${(number)}</td>
        <td>${data[i].User.username}</td>
        <td>${data[i].score}</td>
        </tr>`
        }
    }
    listEl.innerHTML = printing
}

if (currentId === "null") {
    quizNameEl.innerHTML = "Random Quiz!"
    getdbScoredeafult();
} else {
    getdbScoreId();
}
