const router = require('express').Router();

router.get('/', (req, res) => {
  req.logout();
  return res.redirect('/');
});

module.exports = router;
