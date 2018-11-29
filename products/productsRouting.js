const express = require('express');
const services = require('./services/index.js');
const util = require('../util/util');

const router = express.Router();

router.get('/top-sellers', async (req, res) => {
  const products = await services.productsServices.getTopSellers();

  res.render('partials/top-sellers', {
    'user': req.user,
    'top': products,
  });
});

router.get('/:id', async (req, res) => {
  const item = await services.productsServices.findItem(req.params.id);

  if (req.query.cartItem === 'true') {
    const cartItem = new util.Convert(item);
    res.send(cartItem);
  } else {
    res.send(item);
  }
});

module.exports = router;
