const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const config = require('config');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Local = require('passport-local').Strategy;


const User = require('../users/userModel');

passport.use(new Local({
  usernameField: 'email',
}, async (username, password, done) => {
  const user = await User.findOne({ email: username });
  if (user) {
    const res = await bcrypt.compare(password, user.password);
    if (res) {
      const tempUser = await createTempUser(user);
      return done(null, tempUser);
    }
    // done(null, false, { message: 'password or username is incorrect' });
    done(null, new Error());
  } else {
    done(null, false, { message: 'user does not exists' });
  }
}));

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('secret');

/*
 * the following is usefull if token is sent through a authorization
 * bearer token which is not implemented since cookie are used for
 * for transmiting token.
 *
 */
// passport.use(new JwtStrategy(opts, ((jwt_payload, done) => {
//   User.findOne({ _id: jwt_payload.id }, async (err, user) => {
//     if (err) {
//       return done(err, false);
//     }
//     if (!user) {
//       const newUser = await User.create({
//         name: jwt_payload.name,
//         email: jwt_payload.email,
//         cart: {
//           items: [],
//           totalItems: 0,
//           totalPrice: 0,
//         },
//       });
//       done(null, newUser);
//     }
//     if (user) {
//       return done(null, user);
//     }
//     return done(null, false);
//   });
// })));

passport.use(new GoogleStrategy({

  clientID: '596619890647-gchhu49i1ii3ob2c47udbrhmu1ftjlh4.apps.googleusercontent.com',
  clientSecret: '2Zx4GzqmKrGLUseCfei94rOz',
  callbackURL: '/aoth/redirect',


}, async (accessToken, refreshToken, profile, done) => {
  const userEmail = profile.emails[0].value;
  const user = await User.findOne({ email: userEmail });

  if (user) {
    const tempUser = await createTempUser(user);
    done(null, tempUser); // tempUser will be available on req.user in next middleware.
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
    const tempUser = createTempUser(newUser);
    done(null, tempUser);
  }
}));


/**
 *
 * the code below will only be useful if session is being used.
 * currently JWT token are used instead of session for scaling.
 *
 * * */
// passport.serializeUser((user, done) => {
//   done(null, user.id); // goes to req.sessions.passport.id; it is used consequative requests to look up session data.
// });


// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user); // req.user
//   });
// });

/**
 * this function return varsion of user that would be used routes middleware
 * to set cookies. It was extracted to have a unified version across all
 * strategies.
 *
 * @param {Model} user pass user model
 */
const createTempUser = async (user) => {
  const tempUser = {};
  tempUser.name = user.name;
  tempUser.jwt = await user.createJwt(); // this method is on user model prototype
  tempUser.pJwt = await user.createPrivateJwt();
  return tempUser;
};
