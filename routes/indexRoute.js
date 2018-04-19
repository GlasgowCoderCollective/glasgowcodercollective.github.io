const router = require('express').Router();
const path = require('path');
const indexView = path.resolve(__dirname, '..', 'views', 'index.html');

router.get('/', (req, res) => {
    res.sendFile(indexView);
});

module.exports = router;