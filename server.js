const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const http = require('http').Server(app)
const io = require('socket.io')(http)



io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
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

sequelize.sync({ force: false, alter: false}).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});