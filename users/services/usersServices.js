const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { calcTotals } = require('../../util/util');
const util = require('../../util/util.js');


module.exports = class UsersServices {
  constructor(UserModel) {
    this.User = UserModel;
    this.addItemToCart = this.addItemToCart.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(info) {
    const {
      name, email, password, phone,
    } = info;

    const user = await this.User.findOne({ email }, 'name');
    if (user) return createError(404, `${user.name} is alread signed up`);

    const salt = await bcrypt.genSalt(13);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new this.User({
      name,
      email,
      password: hashed,
      phone,
    });

    // const token = await newUser.createJwt();
    // if (token === (undefined || null)) { return createError(500, 'token was not generated'); }
    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      return createError(400, error);
    }

    // const userSnapshot = newUser.getUserSnapshot();
  }

  /**
   *
   * @param {Object} item: the item/product object as returned from database
   * @param {*} userId: user googleID
   *
   */
  async addItemToCart(itemOriginal, userId) {
    if (itemOriginal === (undefined || null) || userId === undefined) return createError('userId or item not correct');

    const item = new util.Convert(itemOriginal);
    let totalItems = 0;

    //  2- find whether item has been added before or not
    const itemExist = await this.User.findOne({ 'cart.items.id': item.id });
    // 3- add item/total
    if (!itemExist) {
      const user = await this.User.findOne({ _id: userId });
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
      //  use $ to refer to object found in array and then update value
      await this.User.update({ 'cart.items.id': item.id }, { $set: { 'cart.items.$.total': total } },
        () => { console.log('total update done!'); });

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
