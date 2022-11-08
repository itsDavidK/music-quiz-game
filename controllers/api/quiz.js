const router = require('express').Router();
const { Question, Quiz, Score, User } = require('../../models');

router.post("/create-quiz", async (req, res) => {
    try {
        const dbQuizData = await Quiz.create({
            quiz_title: req.body.quiz_title,
            user_id: req.session.info.id,
        })
        res.status(200).json(dbQuizData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
)

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
)




module.exports = router;