const router = require('express').Router();

const authRouter = require('./auth');
const talksRouter = require('./talks');

router.use('/auth', authRouter);
router.use('/talks', talksRouter);

module.exports = router;
