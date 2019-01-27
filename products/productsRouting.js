const express = require('express');
const services = require('./services/index.js');

const router = express.Router();

router.get('/category/:category', async (req, res) => {

  let {load, productsPerReq} = req.query;
  let {category} = req.params;
  load = parseInt(load);
  productsPerReq = parseInt(productsPerReq);
  let products;

  if(category) {
    products = await services.productsServices.getCategory(load, productsPerReq, category);
  } 

  if (products instanceof Error) {
    res.status(products.status).end();
  } else if (products === undefined) {
    res.status(404).end();
  } else {
    res.send(JSON.stringify(products));
  }
});

router.get('/:id', async (req, res) => {
  const item = await services.productsServices.findItem(req.params.id);

  if (req.query.cartItem === 'true') {
    const cartItem = new util.Convert(item);
    res.send(cartItem);
  } else {
    if(item instanceof Error) res.status(404).end();
    res.send(item);
  }
});

module.exports = router;
