const express = require('express');
const services = require('./services/index.js');
const logger = require('../logger/logger');

const router = express.Router();

router.get('/category/:category', async (req, res) => {
  let { page, productsPerReq, type, brand, color, gender } = req.query;
  let { category } = req.params;
  page = parseInt(page);
  productsPerReq = parseInt(productsPerReq);
  let products;
  if(category) {
    products = await services.productsServices.getCategory(page, productsPerReq, category, { 
      type: type ? decodeURIComponent(type): null, 
      brand: brand? decodeURIComponent(brand): null, 
      gender,
      color,
    });
  } 

  if (products instanceof Error) {
    logger.error(products)
    res.status(products.status).end();
  } else if (!products || !products.products) {
    logger.error(products)
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
    if(item instanceof Error) {
      logger.error(item)
      res.status(404).end();
    }
    res.send(item);
  }
});

module.exports = router;
