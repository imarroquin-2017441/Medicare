'use strict'

const mongoose = require('mongoose');

const alreadySchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    prescription: {type: mongoose.Schema.ObjectId, ref: 'PresCri'}
})

module.exports = mongoose.model('Already', alreadySchema);