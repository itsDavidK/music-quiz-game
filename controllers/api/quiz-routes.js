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

            user_id: req.session.userInfo.id,
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
            quiz_id: req.body.quiz_id,
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


module.exports = router;