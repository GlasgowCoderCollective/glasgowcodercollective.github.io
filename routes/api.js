const router = require('express').Router();
const { authCheck } = require('../middleware/auth');

const authRouter = require('./auth');
const talksRouter = require('./talks');
const resourceRouter = require('./resources');

router.use('/auth', authRouter);
router.use('/talks', authCheck, talksRouter);
router.use('/resources', authCheck, resourceRouter);

module.exports = router;
