const User = require('../models/user');

const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }

  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.redirect('/');
      }

      return next();
    });
};

module.exports = {
  authCheck,
};
