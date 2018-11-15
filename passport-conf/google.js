const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Local = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../users/userModel');

passport.use(new GoogleStrategy({

  clientID: '596619890647-gchhu49i1ii3ob2c47udbrhmu1ftjlh4.apps.googleusercontent.com',
  clientSecret: '2Zx4GzqmKrGLUseCfei94rOz',
  callbackURL: '/aoth/redirect',


}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ googleID: profile.id });

  if (user) {
    const userModified = { id: user._id, name: user.name, itemsInCart: user.cart.totalItems };
    done(null, userModified); //  req.login(user) req.session.passport.user
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
    const newUserModified = { id: newUser._id, name: newUser.name, itemsInCart: newUser.cart.itemsInCart };
    done(null, newUser);
  }
}));

passport.use(new Local({
  usernameField: 'email',
}, async (username, password, done) => {
  const user = await User.findOne({ email: username });
  if (user) { done(null, user); } else {
    done(null, false, { message: 'user does not exists' });
  }
}));


passport.serializeUser(async (user, done) => {
  // user.token = await user.createJwt();
  done(null, user); // req.session.passport.user
});


passport.deserializeUser(async (userA, done) => {
  const user = await User.findOne({ _id: (userA.id || userA._id) });
  // user.token = userA.token;
  done(null, user); // req.user
});
