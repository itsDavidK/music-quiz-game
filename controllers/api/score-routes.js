const express = require('express');
const router = express.Router();
const { Question, Quiz, Score, User } = require('../../models');

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
            user_id: req.session.userInfo.id,
            quiz_id: req.body.quiz_id
        }).then(data => {
            req.session.currentScore = data.score
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err: err })
        })
    }
});

module.exports = router;