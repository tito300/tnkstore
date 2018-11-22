const express = require('express');
const services = require('./services/index.js');

const router = express.Router();

router.get('/top-sellers', async (req, res) => {
  const products = await services.productsServices.getTopSellers();
  setTimeout(() => {
    res.send(JSON.stringify(products));
    res.end();
  }, 500);
});

module.exports = router;
