'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require("../models/item");
var mongoose = require("mongoose");

var authMiddleware = require('../config/auth');

router.get('/', authMiddleware, function(req, res) {
  res.render("profile", {title: "Profile"});
});

router.get('/profileEdit', function(req, res) {
  res.render("profileEdit", {title: "Profile Edit Page"});
});

router.put('/', function(req, res){
  User.findByIdAndUpdate(req.body._id, req.body, function(err, user){
    res.status(err ? 400 : 200).send(err ? 'profile update failed' : user);
  });
});

router.get('/profileInfo', function(req, res){
  User.findById(req.cookies.userId, function(err, profile){
    res.status(err ? 400 : 200).send(err ? 'profile update failed' : profile);
  });
});

router.post("/", function(req, res){
  var userId = req.body.userId;
  delete req.body["userId"];
	// console.log(req.body);
	var item = new Item(req.body);
	// console.log("item in route", item);
	item.save(function(err, data){
		if (err) res.status(400).send("item could not be saved");
		else {
			User.findByIdAndUpdate(userId, {$push: {items: { name: data.name, description: data.description, url: data.url, _id: data._id }}}, function(err, info){
        res.send(data);
        // if (err) res.status(err ? 400 : 200).send(err ? 'profile update failed' : info);
        // router.get('/', function(req, res) {
        //   console.log('in get');
        //   res.send(info);
        // });
        console.log('data', data);
				console.log('info', info);
			});
		}
	})
})

module.exports = router;
