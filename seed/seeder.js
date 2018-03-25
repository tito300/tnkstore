const Product = require("../models/product.js");
const ProductSeeds = require("./products.js");
const mongoose = require("mongoose");
debugger;
mongoose.connect("mongodb://localhost/fullstack1");


Product.insertMany(ProductSeeds)
        .then(()=> { mongoose.disconnect()});

