'use strict'

const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    name: String,
    description: String,
    salesPlace: String,
    averagePrice: Number
})

module.exports = mongoose.model('Medicine', medicineSchema);