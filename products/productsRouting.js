const express = require('express');
const services = require('./services/index.js');

const router = express.Router();

router.get('/top-sellers', async (req, res) => {

  let {page, perpage} = req.query;
  page = parseInt(page);
  perpage = parseInt(perpage);

  const products = await services.productsServices.getTopSellers(page, perpage);
  res.send(JSON.stringify(products));
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
