const Product = require('../../models/product');
const ProductServices = require('./productsService');

const productsServices = new ProductServices(Product);

module.exports = { productsServices };
