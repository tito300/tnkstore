const express = require('express');
const services = require('./services/index.js');
const {logger} = require('../logger/logger');

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
      brand: brand ? decodeURIComponent(brand): null, 
      gender,
      color,
    });
  } 

  if (products instanceof Error) {
    console.log(`products lookup returned an error: ${JSON.stringify(products)}`);
    logger.error(products)
    res.status(products.status).end();
  } else if (!products || !products.products) {
    logger.error(products)
    res.status(404).end();
  } else {
    res.send(JSON.stringify(products));
  }
});

router.get('/product/:id', async (req, res) => {
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

router.get('/similar', async (req, res) => {
  const categories = JSON.parse(req.query.categories);
  const currentProductId = req.query.current;
  const skip = parseInt(req.query.skip);
  const brand = req.query.brand;

  const products = await services.productsServices.getSimilarItems(categories, currentProductId, skip, brand);

  if (products instanceof Error) {
    res.status(500).end();
  } else {
    res.send(products);
  }
})

module.exports = router;
