const mongoose = require('mongoose');
// const app = require('express')();
const fs = require('fs');
const path = require('path');
const Products = require('../products/productModel.js');
const ProductSeeds = require('./products.js');

async function start() {
  await mongoose.connect('mongodb://localhost/fullstack3');

  // const product = await Products.findOne({});
  // fs.writeFile('img.png', product.image.data);

  ProductSeeds.forEach((product) => {
    const imgUrl = path.resolve(`./public/temp/${product.title}.png`);
    const data = fs.readFileSync(imgUrl);
    product.image = { data: null };
    product.image.data = data;
    product.image.contentType = 'image/png';
  });

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
