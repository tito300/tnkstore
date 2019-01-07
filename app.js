const express = require('express');
// const session = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createLogger, format, transports } = require('winston');
const { colorize, timestamp, json, combine } = format;

const googleSetup = require('./passport-conf/google');
const mainRouter = require('./routs/main-routs.js');
const usersRouter = require('./users/userRouting.js');
const productsRouter = require('./products/productsRouting.js');
const aothRouter = require('./routs/aoth-routs.js');


const logger = createLogger({
  level: 'info',
  format: combine(
    colorize({ colors: { info: 'blue' }}),
    timestamp(),
    json(),
  ),
  transports: new transports.File({filename: 'logs.log'})
});

logger.log('warn', 'Tour data');

// logger.info('fake message - built in');

const app = express();

// app.use(session({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: ['tarekdemachkie'],
// }));

app.use(morgan('dev', { immediate: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(mainRouter);
// app.use('/api', cartRouter);
app.use('/aoth', aothRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

/* this is used to catch react page reloads and redirect them to the app */
app.use('*', (req, res) => {
  res.redirect('/');
});

module.exports = { app };
