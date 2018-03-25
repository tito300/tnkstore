const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


let userSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    googleID: {
        required: true,
        type: String
    },

    cart: {
            items: {
                type: [{}],
                default: [{}] 
            },
            totalItems: {
                type: Number,
                default: 0
            },
            totalPrice: {
                type: Number,
                default: 0 
            }}
})

module.exports = mongoose.model('user', userSchema);