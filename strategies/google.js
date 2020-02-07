const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((currentUser) => done(null, currentUser))
    .catch((mongooseError) => console.error(mongooseError.message));
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/redirect',
},
(accessToken, refreshToken, profile, cb) => {
  User.findOne({ googleId: profile.id })
    .then((currentUser) => {
      if (!currentUser) {
        return new User({
          firstName: profile.name.givenName.toLowerCase(),
          lastName: profile.name.familyName.toLowerCase(),
          displayName: profile.name.givenName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        }).save()
          .then((newUser) => cb(null, newUser));
      }
      return cb(null, currentUser);
    })
    .catch((mongooseError) => console.error(mongooseError.message));
}));
