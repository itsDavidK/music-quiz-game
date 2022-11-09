const router = require('express').Router();
const { Question, Quiz, Score, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/play-alone', async (req, res) => {
    try {
        res.render('quiz', {
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/play-friends', async (req, res) => {
    try {
        res.render('quiz', {
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/create-quiz', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect("/user/login")
        }
        if (req.session.loggedIn) {
            return res.render('create')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/quiz-done', async (req, res) => {
    try {
        res.render('quiz-done', {
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/userpage', async (req, res) => {
    try {

        if (!req.session.loggedIn) {
            return res.redirect("/user/login")
        }
        if (req.session.loggedIn) {
            return res.render('userpage', {
                loggedIn: req.session.loggedIn,
                userInfo: req.session.userInfo
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;