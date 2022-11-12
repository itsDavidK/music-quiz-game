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

                const plainData = userData.get({ plain: true });
                console.log(plainData)
                const level = parseInt(plainData.Profile.userRight / 50);
                const leftover = (plainData.Profile.userRight % 50);
                const percent = (leftover * 2)

                return res.render('userpage', {
                    level,
                    percent,
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

router.get('/quiz-score', async (req, res) => {
    try {
        Score.findAll({
            where: {
                QuizId: null
            }
        }).then(userData => {
            const scores = userData.map((score) => {
                score.get({ plain: true })
            })
            return res.render('scoreboard', {
                loggedIn: req.session.loggedIn,
                userInfo: req.session.userInfo
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/quiz-score/:id', async (req, res) => {
    try {
        Score.findAll({
            where: {
                QuizId: req.params.id
            }
        }).than(scoreData => {
            const scores = scoreData.map((score) => {
                score.get({ plain: true })
            })
            return res.render('scoreboard', {

            })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/gameselect', async (req, res) => {
    try {
        res.render('gameselect', {
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;