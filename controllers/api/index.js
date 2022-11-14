const router = require('express').Router();
const userRoutes = require('./user-routes');
const quizRoutes = require('./quiz-routes');
const scoreRoutes = require('./score-routes');
const profileRoutes = require('./profile-routes');

router.use('/users', userRoutes);
router.use('/quiz', quizRoutes);
router.use('/scores', scoreRoutes);
router.use('/profile', profileRoutes);


module.exports = router;
