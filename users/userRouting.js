const express = require('express');
const util = require('../util/util.js');

const router = express.Router();
const { userService } = require('./services/index.js');
const { productsServices } = require('../products/services/index.js');

/* * *
 *
 * cart main page
 *
 * * * * */
router.get('/cart', (req, res, next) => {
  res.render('cart/cartPage', { 'user': req.user });
});

/*
 *
 * Adds new item to cart
 *
 * * */
router.get('/cart/add/:id', async (req, res) => {
  const productID = req.params.id;

  const item = await productsServices.findItem(productID);

  const totalItems = await userService.addItemToCart(item, req.user.googleID);
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
  const totalItems = await userService.updateCount(itemID, itemQty, userID);
  if (totalItems instanceof Error) return next(totalItems);

  const totalsFile = {
    totalItems: totalItems.items,
  };
  res.send(JSON.stringify(totalsFile));
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

module.exports = router;
