const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { v4: uuidV4 } = require('uuid')
const routes = require('./controllers');
const sequelize = require('./config/connection');
const http = require('http')
const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app)

const io = require('socket.io')(server)
app.set('socketio', io)
const players = []
const playerSockets = []

var varThatTellsArrayToPushOnOne = 1


io.on('connection', function (socket) {
  console.log('connected')
  playerSockets.push(socket)

  socket.on('player-name', name => {
    console.log('hello')
    console.log(name)
    for (let i = 0; i < players.length; i++) {

      if (players[i] === name) {
        varThatTellsArrayToPushOnOne = 0
      }

    }
    if (varThatTellsArrayToPushOnOne === 1) {
      players.push(name)
    }
    console.log(players)
    socket.emit('player-list', players)
    socket.broadcast.emit('player-list', players)
  })

  socket.on('start-game-host', data => {
    socket.broadcast.emit('start-game-user')
  })

  socket.on('send-vids', data => {

    console.log(data)
    socket.broadcast.emit('receive-vids', data)
  })


  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    var i = playerSockets.indexOf(socket)

    playerSockets.splice(i, 1)
    players.splice(i, 1)
    socket.emit('player-list', players)
    console.log('A user disconnected');
  });
});


// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session adding part over here 
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Static directory
app.use(express.static('public'));

// handlebar linking over here
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// route position 
app.use(routes);

sequelize.sync({ force: false }).then(function () {
  server.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});