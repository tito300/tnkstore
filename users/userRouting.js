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

/*
 *
 * Adds new item to cart
 *
 * * */
router.get('/cart/add/:id', async (req, res, next) => {
  const productID = req.params.id;
  let userId;
  if (req.user !== undefined) {
    userId = req.user.id;
  } else { return next(createError('userId is not correct')); }

  const item = await productsServices.findItem(productID);

  const totalItems = await userService.addItemToCart(item, userId);
  const resbody = {
    total: totalItems.items,
  };
  res.send(JSON.stringify(resbody));
});

/* * *
 *
 * updates quantity of an existing item in a cart
 *
 * * * * */
router.put('/cart/update-qty', async (req, res, next) => {
  const itemID = String(req.body.itemID);
  const itemQty = req.body.itemsQty;
  const userID = req.user.googleID;
  const totalItemsInCart = await userService.updateCount(itemID, itemQty, userID);
  if (totalItemsInCart instanceof Error) return next(totalItemsInCart);

  const totals = {
    totalItemsInCart,
  };
  res.send(JSON.stringify(totals));
});

/* * *
 *
 * deletes item from cart and returns total count.
 *
 * * * * */
router.delete('/cart/delete/:id', async (req, res, next) => {
  const itemID = req.params.id;
  const userID = req.user.googleID;

  const totalItems = await userService.deleteCartItem(itemID, userID);
  if (totalItems instanceof Error) return next(totalItems);

  const totalsFile = {
    totalItems: totalItems.items,
  };

  res.send(JSON.stringify(totalsFile));
  // console.log(totalItems);
});

router.post('/user/updateCart', async (req, res) => {
  const userId = req.user.id;
  const { newCart } = req.body.data;
  const merge = (req.query.merge === 'true');

  const updatedCart = await userService.updateCart(userId, newCart, merge);

  res.send(updatedCart);
});

module.exports = router;
