const router = require('express').Router();
const { getWorkshops } = require('../mockdata/workshops');

router.get('/workshops', (req, res) => res.json(getWorkshops()));

module.exports = router;