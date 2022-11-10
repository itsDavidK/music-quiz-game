
const socket = io();
const usersDiv = document.getElementById('usersDiv')
const opponentP = document.createElement('p')
const myUser = document.getElementById('myUser')
let playerNum = 0
let currentPlayer = 'user'
console.log(myUser.textContent)
socket.emit('player-name', myUser.textContent)
socket.on('player-list', players => {
    console.log(`list of players: ${players}`)
    playerConnectedOrDisconnected(players)
})
socket.on('player-number', data => {




})
function playerConnectedOrDisconnected(players) {
    console.log('append')
    myUser.innerText = players
}
socket.emit('sendName', myUser.textContent)