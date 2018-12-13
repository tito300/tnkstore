const mongoose = require('mongoose');
// const app = require('express')();
const fs = require('fs');
const path = require('path');
const Products = require('../products/productModel.js');
const ProductSeeds = require('./products.js');

async function start() {
  await mongoose.connect('mongodb://localhost/fullstack3');

  Products.insertMany(ProductSeeds)
    .then(() => { mongoose.disconnect(); });
}

start();

// app.get('/', async (req, res) => {
//   const product = await Products.findOne({});
//   res.contentType('image/png');
//   res.send(product.image.data);
// });

// app.listen(3002);
