const router = require('express').Router();

const userRoutes = require('./user-routes');
const quiz = require('./quiz');

router.use('/users', userRoutes);
router.use('/quiz', quiz);



module.exports = router;
