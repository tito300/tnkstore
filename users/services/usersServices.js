const { calcTotals } = require('../../util/util');
const util = require('../../util/util.js');

module.exports = class ProductsServices {
  constructor(UserModel) {
    this.User = UserModel;
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  /**
   *
   * @param {Object} item: the item/product object as returned from database
   * @param {*} userId: user googleID
   *
   */
  async addItemToCart(itemOriginal, userId) {
    const item = new util.Convert(itemOriginal);
    let totalItems = 0;

    //  2- find whether item has been added before or not
    const itemExist = await this.User.findOne({ 'cart.items.id': item.id });
    // 3- add item/total
    if (!itemExist) {
      const user = await this.User.findOne({ googleID: userId });
      user.cart.items.push(item);
      // calculate totalItems in cart
      totalItems = calcTotals(user.cart.items);
      user.cart.totalItems = totalItems.items;
      user.cart.totalPrice = totalItems.price;
      await user.save();
    } else if (itemExist) {
      // find index of item to pull index which will be used to update total -
      const index = itemExist.cart.items.findIndex(c => c.id === item.id);
      let total = itemExist.cart.items[index].total; //eslint-disable-line
      total++;
      //  find sub object in array by id -> use $ to refer to object found in array and then update value
      await this.User.update({ 'cart.items.id': item.id }, { $set: { 'cart.items.$.total': total } }, () => { console.log('total update done!'); });

      const user = await this.User.findOne({ googleID: userId });

      // calc totalItems
      totalItems = calcTotals(user.cart.items);
      user.cart.totalItems = totalItems.items;
      user.cart.totalPrice = totalItems.price;
      await user.save();
    }
    return totalItems;
  }
};
