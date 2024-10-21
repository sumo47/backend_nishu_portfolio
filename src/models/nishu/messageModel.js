const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    subject: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now }
})

module.exports.messageSchema = mongoose.model('Message', messageSchema);