const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const Schema = mongoose.Schema; // eslint-disable-line


const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  password: {
    type: String,
  },

  email: {
    type: String,
  },

  transactions: {
    type: [Object],
    default: [],
  },

  googleID: {
    required: false,
    type: String,
  },

  phone: {
    type: String,
  },

  cart: {
    items: {
      type: Array,
    }
  },
});

/**
 * creates a public json token
 * @returns {String} web token
 */
userSchema.methods.createJwt = async function () {
  const token = await jwt.sign(
    {
      name: this.name,
      email: this.email,
    },
    config.get('secret'),
  );
  return token;
};

/**
 * creates a private json token
 * @returns {String} web token
 */
userSchema.methods.createPrivateJwt = async function () {
  const token = await jwt.sign(
    {
      id: this._id,
    },
    config.get('secret'),
  );
  return token;
};

module.exports = mongoose.model('user', userSchema);
