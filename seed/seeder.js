const mongoose = require("mongoose");
const Product = require("../models/product.js");
const ProductSeeds = require("./products.js");
mongoose.connect('mongodb://localhost/fullstack1');


Product.insertMany(ProductSeeds)
  .then(() => { mongoose.disconnect(); });
