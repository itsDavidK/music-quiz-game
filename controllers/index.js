const router = require('express').Router();

const apiRoutes = require('./api');
const user = require('./user')
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/user', user);
router.use('/api', apiRoutes);

module.exports = router;
