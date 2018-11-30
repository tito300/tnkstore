const express = require('express');
const services = require('./services/index.js');

const router = express.Router();

router.get('/top-sellers', async (req, res) => {
  const products = await services.productsServices.getTopSellers();
  res.send(JSON.stringify(products));
});

module.exports = router;
