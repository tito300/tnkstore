const createError = require('http-errors');
const { calcTotals } = require('../../util/util');
const util = require('../../util/util.js');


module.exports = class ProductsServices {
  constructor(UserModel) {
    this.User = UserModel;
    this.addItemToCart = this.addItemToCart.bind(this);
    this.updateCount = this.updateCount.bind(this);
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
      totalItems = calcTotals(user.cart.items);
      user.cart.totalItems = totalItems.items;
      user.cart.totalPrice = totalItems.price;
      await user.save();
    }
    return totalItems;
  }

  async updateCount(itemID, itemQty, userID) {
    try {
      const res = await this.User.update({ 'cart.items.id': itemID, 'googleID': userID }, { $set: { 'cart.items.$.total': itemQty } });
      if (res.nModified === 0) return createError(404, 'item does not exist');
    } catch (err) {
      return createError(500);
    }

    const user = await this.User.findOne({ googleID: userID });
    const totalItems = util.calcTotals(user.cart.items);
    user.cart.totalItems = totalItems.items;
    user.cart.totalPrice = totalItems.price;
    await user.save();

    return totalItems;
  }

  async deleteCartItem(itemID, userID) {
    try {
      const res = await this.User.update({ googleID: userID }, { $pull: { 'cart.items': { 'id': itemID } } });
      if (res.nModified === 0) return createError(404, 'item does not exist');
    } catch (err) {
      return createError('something went wrong while updating data');
    }

    const user = await this.User.findOne({ googleID: userID });
    const totalItems = util.calcTotals(user.cart.items);
    user.cart.totalItems = totalItems.items;
    user.cart.totalPrice = totalItems.price;
    await user.save();

    return totalItems;
  }
};
