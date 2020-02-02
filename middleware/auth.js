const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }

  return next();
};

module.exports = {
  authCheck,
};
