const mongoose = require('mongoose');
const messageSchema = require('./messageSchema');

const chatSchema = new mongoose.Schema({
    name: String,
    chatting: [messageSchema]
});

module.exports = chatSchema;