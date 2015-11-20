'use strict';

var mongoose = require('mongoose');

var Item;

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String},
  createdAt: {type: Date, required: true, default: new Date() },
  owner: {type: String, required: true},
  trade: {type: Boolean, required: true, default: false},
  tradeNumber: {type: String, default: ""}
});

Item = mongoose.model('Item', itemSchema);

module.exports = Item;