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
    type: String,
    required: true,
  },
  material: {
    type: String,
  },
  photo: {
    type: String,
  },
  weight: {
    type: String,
  },
  uploadDate: {
		type: Date
  },
  rating: {
    type: Number,
    default: 0
  },
	lastModified: {
		type: Date
  },
  purchaseCount: {
    type: Number,
    default: 0,
  },
  primaryColor: {
    type: String,
  },

  variants: {
		male: {
			type: [Object]
		},
		female: {
			type: [Object]
		}
	},

  secondaryPhotos: {
    type: [Object],
    default: [],
  }

});

module.exports = mongoose.model('product', productSchema);
