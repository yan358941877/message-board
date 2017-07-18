var express = require('express');
var router = express.Router();

router.get('/github', function (req, res, next) {
  res.send('Renzhengchenggong')
});

module.exports = router