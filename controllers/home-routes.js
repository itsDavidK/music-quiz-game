const router = require('express').Router();
const { Question, Quiz, Score, User, Profile } = require('../models');

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

router.get('/lobby', async (req, res) => {


    try {
        res.render('lobby', {
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
router.get('/play-custom/:id', async (req, res) => {
    try {
        const currentQuiz = req.params.id;
        res.render('customquiz', {
            currentQuiz,
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
            return res.redirect("/users/login")
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
            return res.redirect("/users/login")
        }
        if (req.session.loggedIn) {
            User.findOne({
                include: [Profile, Quiz],
                where: {
                    id: req.session.userInfo.id
                }
            }).then(userData => {

                const plainData = userData.get({ plain: true});
                console.log(plainData) 

                return res.render('userpage', {
                    plainData,
                    loggedIn: req.session.loggedIn,
                    userInfo: req.session.userInfo
                })
            }).catch(err => {
                res.status(500).json({ msg: "error occurred", err });
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;