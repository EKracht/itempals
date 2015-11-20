'use strict';

var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Item = require("../models/item");

var authMiddleware = require('../config/auth');

router.get('/', authMiddleware, function(req, res) {
  var userId = req.cookies.userId;
  Item.find({}, function (err, items){
    var uItems = [];
    var oItems = [];
    if (!err) {
      items.forEach(function(item, index, all){
        if (item.owner == userId && item.trade == true) {
          uItems.push(item);
        } else if (item.owner != userId && item.trade == true) {
          oItems.push(item);
        }
      });
    }
    console.log('items:', items);
    console.log('uItems:', uItems);
    res.render('trade', {title: "Profile", uItems: uItems, oItems: oItems});
  })
});
module.exports = router;