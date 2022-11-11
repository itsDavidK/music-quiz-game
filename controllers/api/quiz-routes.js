const router = require('express').Router();
const { Question, Quiz, Score, User } = require('../../models');

router.get('/', (req, res) => {
    Quiz.findAll({include: [Question]}
    ).then(allUser => 
        res.json(allUser)
    )
})

router.post("/create-quiz", async (req, res) => {
    console.log(req.body)
    try {
        const dbQuizData = await Quiz.create({
            quiz_title: req.body.quiz_title,

            UserId: req.session.userInfo.id,
        })
        res.status(200).json(dbQuizData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.post("/create-question", async (req, res) => {
    try {
        const dbQuestionData = await Question.create({
            URL: req.body.URL,
            QuizId: req.body.QuizId,
        })
        res.status(200).json(dbQuestionData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.get('/:id', (req, res) => {
    Quiz.findByPk(req.params.id, {
        include: [Question]
    }).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
})

router.delete("/delete/:id", (req, res) => {
    if(!req.session.loggedIn) {
        return res.redirect('/login');
    }
    Quiz.destroy({
        where: {
            id: req.body.id
        }
    }).then(data => [
        res.json(data)
    ]).catch(err => {
        console.log(err);
        res.status(500).json({err:err})
    })
})

module.exports = router;