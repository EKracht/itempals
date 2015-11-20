'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');

router.put('/', function(req, res){
  var kittyId = req.body.kittyId;
  var trade = false;
  console.log('kittyid', kittyId);
  Item.findById(kittyId, function(err, item){
    console.log('item', item);
    if (item.trade === true) {
      Item.findByIdAndUpdate(kittyId, {$set: {trade: false}}, function(err, item){
        if (err) res.send(err);
      })
    } else {
      Item.findByIdAndUpdate(kittyId, {$set: {trade: true}}, function(err, item){
      if (err) res.send(err);
      })
    }
  })
});
//
router.get('/', function(req, res) {
	// find all items, send the list of items to Jade
	Item.find({}, function(err, items){
		if (err){
			res.status(400).send(err);
		} else {			
  		res.render("items", {items: items});
		}
  });
});

router.delete('/', function(req, res){
  var kittyId = req.body.kittyId;

  console.log("kittyid:", kittyId);
  Item.findByIdAndRemove(kittyId, function(err, item){
    if (err) {
      console.log('err', err);
      console.log('item', item);
      res.status(400).send("error");
    } else {
    res.send("bye bye kitty");
    }
    //if (err) res.send("why would you delete a kitty :(")
  });
});

// router.post('/')
module.exports = router;