'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');

//
router.get('/', function(req, res) {
	// find all items, send the list of items to Jade
	Item.find({}, function(err, items){
		if (err){
			res.status(400).send(err);
		} else {			
  		res.render("items", {items: items});
		}
	}) 
});

router.delete('/', function(req, res){
  var kittyId = req.body.kittyId;
  console.log("kittyid:", kittyId);
  Item.findByIdAndRemove(kittyId, function(err, item){
    if (err) { console.log("ERROR IN DELETE KITTY", err, item)
      res.send("why would you delete a kitty :(" , err)
    }
    res.send("bye bye kitty");
  });
});

// router.post('/')
module.exports = router;