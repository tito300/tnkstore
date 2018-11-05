const Product = require('../productModel');
const ProductServices = require('./productsService');

const productsServices = new ProductServices(Product);

module.exports = { productsServices };
