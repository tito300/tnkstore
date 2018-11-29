const createError = require('http-errors');
const bcrypt = require('bcrypt');
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


  async updateCart(userId, newItems, merge) {
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
    if (merge === true) {
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
      return customItems;
    } catch (err) {
      return createError('cart was not updated');
    }
  }
};
