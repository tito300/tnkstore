const fs = require('fs');
const createError = require('http-errors');

module.exports = class ProductsServices {
  constructor(ProductModel) {
    this.Product = ProductModel;
    this.getTopSellers = this.getTopSellers.bind(this);
  }

  async getTopSellers(page, maxNum) {

    let skip = page === 1 ? 0 : (page - 1) * maxNum;
    const products = await this.Product.find({}, null, {sort: {purchaseCount: -1}, skip, limit: maxNum});

    // adds ../ to each photo path
    const mproducts = this._fixPath(products);
    return mproducts;
  }

  async addItemToCart(id) {}

  async findItem(id) {
    const item = await this.Product.findOne({ id });

    if(item === null) return createError(404, 'not a valid id');
    return item;
  }

  _fixPath(products) { // eslint-disable-line
    const mproducts = products.map((element) => {
      /* element is of Model type and can't be copied/cloned. toObject() will solve the problem */
      const elementObject = element.toObject();
      elementObject.photo = `./${element.photo}`;
      return elementObject;
    });
    return mproducts;
  }
};
