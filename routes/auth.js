const router = require('express').Router();

const { authCheck } = require('../middleware/auth');
const googleRouter = require('./google');
const logoutRouter = require('./logout');

router.get('/user', authCheck, (req, res) => res.json({ error: false, data: req.user }));

router.use('/google', googleRouter);
router.use('/logout', logoutRouter);

module.exports = router;
