const mongoose = require('mongoose');

let ErrorSchema = new mongoose.Schema({
    error_message: String,
    error_stack: String,
    remote_address: String,
    info: String,
}, {
    timestamps: true
})

let ClientError = mongoose.model('clientError', ErrorSchema);

module.exports = ClientError;