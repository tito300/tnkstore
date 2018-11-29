const express = require('express');
const createError = require('http-errors');
const passport = require('passport');

const router = express.Router();
const { userService } = require('./services/index.js');
const { productsServices } = require('../products/services/index.js');


/* * *
 *
 * register user
 *
 * * * * */
router.post('/register', async (req, res, next) => {
  // debugger;
  const newUser = await userService.registerUser(req.body);
  if (newUser.status === 404) return res.status(404).send(newUser);

  req.login(newUser, (err) => {
    if (err) return next(err);
    res.send(true);
  });
});

/* * *
 *
 * cart main page
 *
 * * * * */
router.get('/cart', (req, res, next) => {
  // if (!req.user) return res.render('cart/cartPage_offline');
  res.render('cart/cartPage', { 'user': req.user });
});


/* * *
 *
 * updates db cart state with the provided new state
 *
 * * * * */
router.post('/user/updateCart', async (req, res) => {
  const userId = req.user.id;
  const { newCart } = req.body.data;
  const merge = (req.query.merge === 'true');

  const updatedCart = await userService.updateCart(userId, newCart, merge);

  res.send(updatedCart);
});

module.exports = router;
