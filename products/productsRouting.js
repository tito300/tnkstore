const express = require('express');
const services = require('./services/index.js');

const router = express.Router();

router.get('/top-sellers', async (req, res) => {
  const products = await services.productsServices.getTopSellers();

  res.render('partials/top-sellers', {
    'user': req.user,
    'top': products,
  });
});

module.exports = router;
