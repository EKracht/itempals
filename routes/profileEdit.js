'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require("../models/item");

var authMiddleware = require('../config/auth');

router.get('/', authMiddleware, function(req, res) {
  res.render("profileEdit", {title: "Profile Edit Page"});
});



// router.get('/', authMiddleware, function(req, res) {
//   var userId = req.cookies.userId;
//   console.log("USER ID", userId)
//   Item.find({}, function (err, items){
//     var uItems = [];
//     if (err) {
//      send(err)
//     } else {
//       items.forEach(function(item, index, all){
//          if (item.owner == userId) {
//           uItems.push(item);
//         }
//       });
//       if (uItems.length === 0){
//          uItems.push({name: "EXAMPLE", description: "likes catnip, snuggling and pouncing on grasshoppers", url: "http://www.plupetstore.com/wp-content/uploads/2015/08/l-Newborn-kitten.jpg", owner: userId, _id: 0})
//       }
//     console.log('items:', items);
//     console.log('uItems:', uItems);
//     res.render('profileEdit', {title: "Profile Edit Page", uItems: uItems});
//   });

router.get('/profileInfo', function(req, res){
  User.findById(req.cookies.userId, function(err, profile){
    res.status(err ? 400 : 200).send(err ? 'profile update failed' : profile);
  });
});

module.exports = router;