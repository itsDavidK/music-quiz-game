const express = require('express');
const router = express.Router();
const { Question, Quiz, Score, User, Profile } = require('../../models');

router.get('/', (req, res) => {
    Score.findAll().then(allUser =>
        res.json(allUser)
    )
})

router.post('/create', (req, res) => {
    // create a new category
    if (!req.session.loggedIn) {
        return;
    } else {
        Score.create({
            score: req.body.score,
            UserId: req.session.userInfo.id,
            QuizId: req.body.QuizId
        }).then(data => {
            req.session.currentScore = data.score
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err: err })
        })
    }
});

router.get('/default-game', async (req, res) => {
    try {
        Score.findAll({
            include: [User],
            where: {
                QuizId: null
            }
        }).then(userData => {
            res.json(userData)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
    Score.findAll({
        include: [User, Quiz],
        where: {
            QuizId: req.params.id
        },
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
})

module.exports = router;