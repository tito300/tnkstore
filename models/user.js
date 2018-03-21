const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

userSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    googleID: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('user', userSchema);