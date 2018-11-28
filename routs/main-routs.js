const express = require('express');

const router = express.Router();
const Products = require('../products/productModel');

router.get('/', (req, res) => {
  /* for front end use in localStorage to manage state */
  if (req.user) {
    res.cookie('signedin', true);
  } else { res.cookie('signedin', false); }


  res.render('index', { 'user': req.user });
});

module.exports = router;

/*
 *
 *
 *
 * */
