const express = require('express');
const router = express.Router();
const { Question, Quiz, Score, User } = require('../../models');

router.post('/create', (req, res) => {
    // create a new category
    Score.create({
        score: req.body.score,
        user_id: req.session.userInfo.id,
        quiz_id: req.body.quiz_id
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
});

module.exports = router;