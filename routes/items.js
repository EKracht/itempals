'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');

router.get('/', function(req, res) {
  Item.find()
  res.render("items", {title: "Items for Trade"});
});

router.post('/')