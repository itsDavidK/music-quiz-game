const router = require('express').Router();
const { Question, Quiz, Score, User } = require('../models');

router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn,
        userInfo: req.session.userInfo
    });
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        loggedIn: req.session.loggedIn,
        userInfo: req.session.userInfo
    });
})

module.exports = router;