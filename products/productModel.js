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
  image: {
    data: Buffer,
    contentType: String,
  },

  variants: {
    type: mongoose.Schema.Types.Mixed,
    default: { male: [], female: [] }
  },

  secondaryPhotos: {
    type: Array,
    default: [],
  }

});

module.exports = mongoose.model('product', productSchema);
