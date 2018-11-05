const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../users/userModel');

passport.use(new GoogleStrategy({

  clientID: '596619890647-gchhu49i1ii3ob2c47udbrhmu1ftjlh4.apps.googleusercontent.com',
  clientSecret: '2Zx4GzqmKrGLUseCfei94rOz',
  callbackURL: '/aoth/redirect',


}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ googleID: profile.id });

  if (user) {
    done(null, user); //  req.login(user) req.session.passport.user
  } else {
    const newUser = await User.create({
      name: profile.displayName,
      googleID: profile.id,
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
    });
    done(null, newUser);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id); // req.session.passport.user
});


passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user); // req.user
});
