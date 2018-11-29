const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Local = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../users/userModel');

passport.use(new GoogleStrategy({

  clientID: '596619890647-gchhu49i1ii3ob2c47udbrhmu1ftjlh4.apps.googleusercontent.com',
  clientSecret: '2Zx4GzqmKrGLUseCfei94rOz',
  callbackURL: '/aoth/redirect',


}, async (accessToken, refreshToken, profile, done) => {
  const userEmail = profile.emails[0].value;
  const user = await User.findOne({ email: userEmail });

  if (user) {
    const userModified = { id: user._id, name: user.name, itemsInCart: user.cart.totalItems };
    done(null, userModified); //  req.login(user) req.session.passport.user
  } else {
    const newUser = await User.create({
      name: profile.displayName,
      googleID: profile.id,
      email: userEmail,
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
    });
    done(null, newUser);
  }
}));

passport.use(new Local({
  usernameField: 'email',
}, async (username, password, done) => {
  const user = await User.findOne({ email: username });
  if (user) {
    const res = await bcrypt.compare(password, user.password);
    if (res) return done(null, user);
    done(null, false, { message: 'password or username is incorrect' });
  } else {
    done(null, false, { message: 'user does not exists' });
  }
}));


passport.serializeUser(async (user, done) => {
  // user.token = await user.createJwt();
  done(null, user); // user goes to req.session.passport.user
});


passport.deserializeUser(async (userA, done) => {
  const user = await User.findOne({ _id: (userA.id || userA._id) });
  done(null, user); // user goes to req.user on every req
});
