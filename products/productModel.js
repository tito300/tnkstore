const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line

const productSchema = new Schema({

  id: String,
  title: {
    type: String,
    required: true,
  },
  discreption: {
    type: String,
  },
  price: {
    type: Number,
  },

  photo: {
    type: String,
  },

  totalAvailable: {
    type: Number,
  },

});

module.exports = mongoose.model('product', productSchema);
