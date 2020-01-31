const router = require('express').Router();
const talksRouter = require('./talks');

router.use('/talks', talksRouter);

module.exports = router;
