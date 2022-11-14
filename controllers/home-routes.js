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
            return res.redirect("/users/login", {
                loggedIn: req.session.loggedIn,
                userInfo: req.session.userInfo
            })
        }
        if (req.session.loggedIn) {
            return res.render('create', {
                loggedIn: req.session.loggedIn,
                userInfo: req.session.userInfo
            })
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


router.get('/lobby', async (req, res) => {


    try {

        User.findOne({
            include: [Profile, Quiz],
            where: {
                id: req.session.userInfo.id
            }
        }).then(data => {
            const plainData = data.get({ plain: true });
            return res.render('lobby', {
                plainData,
                loggedIn: req.session.loggedIn,
                userInfo: req.session.userInfo
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/quiz-score', (req, res) => {
    const currentQuiz = "null";
    return res.render('scoreboard', {
        currentQuiz,
        loggedIn: req.session.loggedIn,
        userInfo: req.session.userInfo
    })
})

router.get('/quiz-score/:id', (req, res) => {
    const currentQuiz = req.params.id;
    return res.render('scoreboard', {
        currentQuiz,
        loggedIn: req.session.loggedIn,
        userInfo: req.session.userInfo
    })
})

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

router.get('/play-alone/custom-game', async (req, res) => {
    try {
        const dbQuizData = await Quiz.findAll();

        const quizzes = dbQuizData.map((quiz) =>
            quiz.get({ plain: true })
        );
        console.log(quizzes)
        res.render('customselect', {
            quizzes,

            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;