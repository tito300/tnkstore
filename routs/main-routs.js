const express = require('express');

const router = express.Router();
const Products = require('../products/productModel');

router.get('/', (req, res) => {
  res.render('index', { 'user': req.user });
});

module.exports = router;
