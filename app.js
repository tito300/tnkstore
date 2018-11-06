const express = require('express');
const createError = require('http-errors');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('config');
const aothRouter = require('./routs/aoth-routs.js');
const mainRouter = require('./routs/main-routs.js');
const productsRouter = require('./products/productsRouting.js');
const usersRouter = require('./users/userRouting.js');
const googleSetup = require('./passport-conf/google');


const app = express();

app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.get('key')],
}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.use(mainRouter);
app.use('/aoth', aothRouter);
app.use('/products', productsRouter);
app.use('/', usersRouter);

// handles 404 errors. these errors are not caused by an actual error
// they indicate that the req reached this last middleware without a response
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = { app };
