const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const { calcTotals } = require('../../util/util');
const util = require('../../util/util.js');


module.exports = class UsersServices {
  constructor(UserModel) {
    this.User = UserModel;
    this.registerUser = this.registerUser.bind(this);
    this.updateCart = this.updateCart.bind(this);
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

    newUser.jwt = await newUser.createJwt();
    newUser.pJwt = await newUser.createPrivateJwt();
    

    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      return createError(400, error);
    }
  }

  async getJWT(email) {
    const user = this.User.findOne({ email });
    const jwt = await user.createJwt();
    return jwt;
  }

  async updateCart(userId, newItems, login = false) {
    if ((userId || newItems) === undefined) return createError(404, 'items of user is not provided');

    const user = await this.User.findOne({ _id: userId });
    let dbItems = [...user.cart.items];
    let customItems = [];

    /*
     *
     * login is to check whether user is requesting cart update during logging in or
     * when already in a logged in state. if user is logging in then db cart state and
     * new cart state will be combined so user doesn't lose previously added items.
     * foreach loop is to ensure there is no duplicate when combining states.
     * else if user is already in a logged in state then db state will be completely
     * replaced with the new cart state.
     *
     * */
    if (login) {
      newItems.forEach((newItem) => {
        dbItems = dbItems.filter(dbItem => dbItem.id !== newItem.id);
      });
      customItems = [...dbItems, ...newItems];
    } else {
      customItems = [...newItems];
    }

    user.cart.items = customItems;

    try {
      await user.save();
      if (login) return customItems;
      return true;
    } catch (err) {
      return createError('cart was not updated');
    }
  }

  async getCartItems(userId) {
    const user = await this.User.findOne({ _id: userId });

    return user.cart.items;
  }

  async getUser(id) {
    const user = await this.User.findOne({ _id: id });
    return user;
  }
};

/* temp backup services */

// async deleteCartItem(itemID, userID) {
//   try {
//     const res = await this.User.update({ googleID: userID }, { $pull: { 'cart.items': { 'id': itemID } } });
//     if (res.nModified === 0) return createError(404, 'item does not exist');
//   } catch (err) {
//     return createError('something went wrong while updating data');
//   }

//   const user = await this.User.findOne({ googleID: userID });
//   const totalItems = util.calcTotals(user.cart.items);
//   user.cart.totalItems = totalItems.items;
//   user.cart.totalPrice = totalItems.price;
//   await user.save();

//   return totalItems;
// }


/**
   *
   * @param {Object} item: the item/product object as returned from database
   * @param {*} userId: user googleID
   *
   */
  // async addItemToCart(itemOriginal, userId) {
  //   console.log('addItemToCart is called');
    
  //   if (itemOriginal === (undefined || null) || userId === undefined) {
  //    return createError('userId or item not correct');
  //   }  

  //   const item = util.convert(itemOriginal);

  //   const itemExist = await this.User.findOne({ '_id': userId, 'cart.items.id': item.id });

  //   if (!itemExist) {
  //     const user = await this.User.findOne({ _id: userId });
  //     user.cart.items.push(item);
  //     try {
  //       await user.save();
  //       return true
  //     } catch(err) {
  //       return createError('something went wrong while save item to cart');
  //     }
  //   } else if (itemExist) {
  //     const index = itemExist.cart.items.findIndex(c => c.id === item.id);

  //     let total = itemExist.cart.items[index].total; //eslint-disable-line
  //     total++;

  //     //  use $ to refer to object found in array and then update value
  //     try {
  //       await this.User.update({ 'cart.items.id': item.id }, { $set: { 'cart.items.$.total': total } },
  //         () => { console.log('total update done!'); });
  //     } catch(err) {
  //       return createError('something went wrong while updating the cart');
  //     }
    
  //   } else {
  //     return createError(404, 'something went wrong');
  //   }

  // }
