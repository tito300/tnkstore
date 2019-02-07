const express = require('express');
const services = require('./services/index.js');

const router = express.Router();

router.get('/category/:category', async (req, res) => {

  let { page, productsPerReq, type, brand, color } = req.query;
  let { category } = req.params;
  page = parseInt(page);
  productsPerReq = parseInt(productsPerReq);
  let products;
  if(category) {
    products = await services.productsServices.getCategory(page, productsPerReq, category, { 
      type: type ? decodeURIComponent(type): null, 
      brand: brand? decodeURIComponent(brand): null, 
      color
    });
  } 

  if (products instanceof Error) {
    res.status(products.status).end();
  } else if (!products || !products.products) {
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
