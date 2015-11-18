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

// router.post('/')
module.exports = router;