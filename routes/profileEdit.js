'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require("../models/item");

var authMiddleware = require('../config/auth');

router.get('/', authMiddleware, function(req, res) {
  res.render("profileEdit", {title: "Profile Edit Page"});
});

router.get('/profileInfo', function(req, res){
  User.findById(req.cookies.userId, function(err, profile){
    res.status(err ? 400 : 200).send(err ? 'profile update failed' : profile);
  });
});

module.exports = router;