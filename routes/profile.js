'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require("../models/item");
var mongoose = require("mongoose");

var authMiddleware = require('../config/auth');

/////// THESET TWO ROUTES ARE UNDER CONSTRUCTION???? ///////////

// router.delete('/', function(req, res){
//   var userId = req.cookies.userId;
//   var kittyId = req.body.kittyId
//   console.log("kittyid:", kittyId);
//   Item.findByIdAndRemove(kittyId, function(err, item){
//     res.send("bye bye kitty");
//     //if (err) res.send("why would you delete a kitty :(")
//   });
// });

    // User.findById(userId, function(err, user){
    //   user.items.findByIdAndRemove(kittyId, function(err, item){

//need to do item.find for all item; if item.ower == id
router.get('/', authMiddleware, function(req, res) {
  var userId = req.cookies.userId;
  Item.find({}, function (err, items){
    var uItems = [];
    var trades = [];
    if (!err) {
      items.forEach(function(item, index, all){
        if (item.owner == userId) {
          uItems.push(item);
          console.log("TRADE NO" , item.tradeNumber, "ITEM", item)
          if (item.tradeNumber.length > 0) {
            var thisTrade = {}
            var ids = item.tradeNumber.split("FOR")
            var kitty1Id = ids[0];
            var kitty2Id = ids[1]
            items.findById(kitty1Id, function(err, kitty){
              console.log(kitty)
              //create a key of kitty2 and put the entire
              // kitty 2 object in that key
              thisTrade.kitty1= kitty;
            })
             items.findById(kitty2Id, function(err, kitty){
              console.log(kitty)
              //create a key of kitty2 and put the entire
              // kitty 2 object in that key
              thisTrade.kitty2= kitty
              // push the entire trade into the trades div
              trades.push(thisTrade)
            })
          }
        }
      });
    }
    console.log('items:', items);
    console.log('uItems:', uItems);
    res.render('profile', {title: "Profile", items: uItems, trades: trades});
  })

  // User.findById(id, function(err, profile){
  // if (err){
  //   res.send("access denied");
  //   } else {
  //     res.render("profile", {title: "Profile", profile: profile });
  //   }
  // });
});

router.get('/profileEdit', function(req, res) {
  res.render("profileEdit", {title: "Profile Edit Page"});
});


router.get('/profileInfo', function(req, res){
  User.findById(req.cookies.userId, function(err, profile){
    res.status(err ? 400 : 200).send(err ? 'profile update failed' : profile);
  });
});
/////// THIS ROUTES IS UNDER CONSTRUCTION ///////////
// router.get('/:userId', authMiddleware, function(req, res) {
//   User.findById(req.params.userId, function(err, profile){
//     if (err){
//       res.send("access denied");
//     } else {
//       res.render("/profile", {title: "Profile" });
//     };
//   });
// });

router.put('/', function(req, res){
  User.findByIdAndUpdate(req.body._id, req.body, function(err, user){
    res.status(err ? 400 : 200).send(err ? 'profile update failed' : user);
  });
});

router.post("/", function(req, res){
	var item = new Item(req.body);
	// console.log("item in route", item);
	item.save(function(err, data){
		if (err) res.status(400).send("item could not be saved");
		// else {
  //      User.findByIdAndUpdate({$push: {items: { name: data.name, description: data.description, url: data.url, _id: data._id, owner: data.owner }}}, function(err, info){
  //      res.send(info);
  //      // if time look into not sending back hashed pass
  //       // if (err) res.status(err ? 400 : 200).send(err ? 'profile update failed' : info);
  //       // router.get('/', function(req, res) {
  //       //   console.log('in get');
  //       //   res.send(info);
  //       // });
  //       //console.log('data', data);
  //       //console.log('info', info);
  //      }); 
  //    }
  res.send(data)
	})
})

module.exports = router;
