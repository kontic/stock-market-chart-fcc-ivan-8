var express = require('express');
var router = express.Router();
var socket = require('socket.io');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SMC App' });
});

module.exports = router;
