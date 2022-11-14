const router = require('express').Router();

const apiRoutes = require('./api');
const user = require('./user')
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);

// profile, userlogin, userSignup are all in here
router.use('/users', user);
router.use('/api', apiRoutes);

module.exports = router;
