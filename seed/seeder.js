const mongoose = require('mongoose');
// const app = require('express')();
const fs = require('fs');
const path = require('path');
const Products = require('../products/productModel.js');
const ProductSeeds = require('./50FakeProducts.js');

async function start() {
  await mongoose.connect('mongodb://localhost/fullstack4');

  Products.insertMany(ProductSeeds)
    .then(() => { mongoose.disconnect(); });
}

start();
