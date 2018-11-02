/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const util = require('../util/util.js');

/* * *
 *
 * Route to add new item to cart.
 * pulls product information -> create a cart item object -> push to cart -> calc total value
 *
 * * * * */
router.get('/cart/add/:id', async (req, res) => {
  // 1-find and pull item
  const productID = req.params.id;
  const item = await Product.findOne({ id: productID });
  const newObj = new util.Convert(item);
  const objID = newObj.id;

  //  2- find whether item has been added before or not
  const itemExist = await User.findOne({ 'cart.items.id': objID });
  // 3- add item/total
  if (!itemExist) {
    await User.update({ googleID: req.user.googleID }, { $addToSet: { 'cart.items': newObj } }, () => { console.log('new item added to cart!'); });
    const user = await User.findOne({ googleID: req.user.googleID });

    // calc totalItems
    const totalItems = util.calcTotals(user.cart.items);
    user.cart.totalItems = totalItems.items;
    user.cart.totalPrice = totalItems.price;
    await user.save();
    const body = {
      total: totalItems.items,
    };
    res.send(JSON.stringify(body));
  } else if (itemExist) {
    // find index of item to pull index which will be used to update total -
    const index = itemExist.cart.items.findIndex(c => c.id === objID);
    let total = itemExist.cart.items[index].total; //eslint-disable-line
    total++;
    //  find sub object in array by id -> use $ to refer to object
    //  found in array and then update value
    await User.update({ 'cart.items.id': objID }, { $set: { 'cart.items.$.total': total } }, () => { console.log('total update done!'); });

    const user = await User.findOne({ googleID: req.user.googleID });

    // calc totalItems
    const totalItems = util.calcTotals(user.cart.items);
    user.cart.totalItems = totalItems.items;
    user.cart.totalPrice = totalItems.price;
    await user.save();
    const body = {
      total: totalItems.items,
    };
    res.send(JSON.stringify(body));
    total = 1;
  }
});

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
