var express = require('express');
var router = express.Router();
var Note = require('../model/note');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '留言板' });
});


module.exports = router;