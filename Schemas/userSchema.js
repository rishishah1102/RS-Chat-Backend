const mongoose = require('mongoose');
const chatSchema = require('./chatSchema');

const userSchema = new mongoose.Schema({
    phoneNumber: String,
    profilePhoto: String,
    name: String,
    description: String,
    chats: [chatSchema]
});

module.exports = userSchema;