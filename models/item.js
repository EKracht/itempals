'use strict';

var mongoose = require('mongoose');

var Item;

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String},
  createdAt: {type: Date, required: true, default: new Date() }
});

Item = mongoose.model('Item', itemSchema);

module.exports = Item;
