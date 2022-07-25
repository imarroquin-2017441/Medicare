'use strict'

const mongoose = require('mongoose');

const prescriSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    name: String,
    description: String,
    ingredients: String,
    preparation: String,
    like: Number
})

module.exports = mongoose.model('PresCri', prescriSchema);