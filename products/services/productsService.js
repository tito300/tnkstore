const fs = require('fs');
const createError = require('http-errors');

module.exports = class ProductsServices {
  constructor(ProductModel) {
    this.Product = ProductModel;
    this.getCategory = this.getCategory.bind(this);
  }

  async getCategory(page, productsPerReq, category, {type, color, brand}) {

    let skip = page === 1 ? 0 : (page - 1) * productsPerReq;
    let products;
    let sortBy = category === 'topsellers' ? {purchaseCount: -1}
      : category === 'newdesigns' ? {uploadDate: -1}
      : {};
    let query = category === 'tshirts'?  {type: 'tshirt'} 
      : category === 'sweaters' ? {type: 'sweater'}
      : category === 'shirts' ? {type: 'shirt'}
      : category === 'children' ? {category: 'kids'}
      : category === 'holidays' ? {category: 'holiday'}
      : category === 'animals' ? {category: 'animals'}
      : {};
      
    if(brand) {
      query.brand = brand;
    } 
    if(type) {
      query.type = type;
    }

    try{
      products = await this.Product.find(query, null, {sort: sortBy, skip, limit: productsPerReq}).exec();
      let count = await this.Product.find(query).countDocuments();
      // adds ../ to each photo path
      const mproducts = this._fixPath(products);
      return {
        products: mproducts,
        count,
      };
    } catch(err) {
      if(err.driver) {
        return createError(500, 'Database is down')
      } else {
        return createError(404, err.message);
      }
    }
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
