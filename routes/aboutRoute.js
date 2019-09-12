const router = require('express').Router();
const path = require('path');

const aboutView = path.resolve(__dirname, '..', 'views', 'about.html');

router.get('/', (req, res) => res.sendFile(aboutView));

module.exports = router;
