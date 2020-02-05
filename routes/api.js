const router = require('express').Router();
const { authCheck } = require('../middleware/auth');

const authRouter = require('./auth');
const talksRouter = require('./talks');

router.use('/auth', authRouter);
router.use('/talks', authCheck, talksRouter);

module.exports = router;
