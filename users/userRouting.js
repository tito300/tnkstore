const express = require('express');
const util = require('../util/util.js');

const router = express.Router();
const { userService } = require('./services/index.js');
const { productsServices } = require('../products/services/index.js');

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

module.exports = router;
