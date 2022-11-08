const router = require('express').Router();
const { Question, Quiz, Score, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/play-alone', async (req, res) => {
    try {
        res.render('quiz')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/play-friends', async (req, res) => {
    try {
        res.render('quiz')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/create-quiz', async (req, res) => {
    if (!req.session.loggedIn) {

        try {
            res.render('create')
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    else {
        try {
            res.render('login')
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
})


module.exports = router;