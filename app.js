const express = require('express');
// const session = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createLogger, format, transports } = require('winston');
const { colorize, timestamp, json, combine } = format;
const helmet = require('helmet');
const fs = require('fs');
const path = require('path')

const googleSetup = require('./passport-conf/google');
const mainRouter = require('./routs/main-routs.js');
const usersRouter = require('./users/userRouting.js');
const productsRouter = require('./products/productsRouting.js');
const aothRouter = require('./routs/aoth-routs.js');

const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize({ colors: { info: 'blue' }}),
    timestamp(),
    json(),
  ),
  transports: new transports.File({filename: 'app-logs.log'})
});

const app = express();

app.use(morgan('combined', { immediate: false, stream: accessLogsStream }));

app.use(helmet())
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
app.use('/aoth', aothRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

/* this is used to catch react page reloads and redirect them to the app */
app.use('*', (req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next)=>{
  logger.error(err);
  res.status(err.status || 500).end();
})

module.exports = { app, logger };
