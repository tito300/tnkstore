/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const util = require('../util/util.js');
const { userService } = require('../users/services/index');

/* * *
 *
 * main page redirect
 *
 * * * * */
router.get('/cart/main', (req, res, next) => {
  res.render('cart/cartPage', { 'user': req.user });
});

/* * *
 *
 * updates cart items count when client changes it and re calculates total count.
 *
 * * * * */
router.put('/cart/update-qty', async (req, res) => {
  const itemID = String(req.body.itemID);
  await User.update({ 'cart.items.id': itemID }, { $set: { 'cart.items.$.total': req.body.itemsQty } });
  try {
    const user = await User.findOne({ googleID: req.user.googleID });
    // calc totalItems
    const totalItems = util.calcTotals(user.cart.items);
    user.cart.totalItems = totalItems.items;
    user.cart.totalPrice = totalItems.price;
    await user.save();
    const totalsFile = {
      totalItems: totalItems.items,
    };
    res.send(JSON.stringify(totalsFile));
  } catch (err) {
    console.log(err);
  }
});

/* * *
 *
 * deletes item from cart and re-calculates total count.
 *
 * * * * */
router.delete('/cart/delete/:id', async (req, res) => {
  const itemID = req.params.id;

  await User.update({ googleID: req.user.googleID }, { $pull: { 'cart.items': { 'id': req.params.id } } });
  try {
    const user = await User.findOne({ googleID: req.user.googleID });
    // calc totalItems
    const totalItems = util.calcTotals(user.cart.items);
    user.cart.totalItems = totalItems.items;
    user.cart.totalPrice = totalItems.price;
    await user.save();

    const totalsFile = {
      totalItems: totalItems.items,
    };

    res.send(JSON.stringify(totalsFile));
    // console.log(totalItems);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
