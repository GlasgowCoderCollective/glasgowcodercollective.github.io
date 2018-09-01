const router = require('express').Router();
const path = require('path');

const videosView = path.resolve(__dirname, '..', 'views', 'videos.html');

router.get('/', (req, res) => res.sendFile(videosView));

module.exports = router;