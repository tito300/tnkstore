const express = require('express');

const router = express.Router();
const Products = require('../models/product.js');

router.get('/', (req, res) => {
  res.render('index-test', { 'user': req.user });
});

router.get('/api/top-sellers', (req, res) => {
  Products.find({})
    .then((productsFound) => {
      res.send(productsFound);
    });
});

module.exports = router;
