// const webpack = require('webpack');
// const config = require('./webpack.config'); // eslint-disable-line

// const compiler = webpack(config);
// const middleware = require('webpack-dev-middleware');

// const instance = middleware(compiler);

const express = require('express');
const mongoose = require('mongoose');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const aothRouter = require('./routs/aoth-routs.js');
const mainRouter = require('./routs/main-routs.js');
const cartRouter = require('./routs/cart.js');
const googleSetup = require('./passport-conf/google');

const app = express();
// app.use(instance);
mongoose.connect('mongodb://localhost/fullstack3')
  .then(() => console.log('connected successfully to db'));


app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['tarekdemachkie'],
}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.use(mainRouter);
app.use(cartRouter);
app.use('/aoth', aothRouter);


app.listen(3001, () => { console.log('listening on port 3001'); });
