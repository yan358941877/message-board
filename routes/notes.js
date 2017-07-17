var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/total', function(req, res, next) {
  console.log('success')
});

router.post('/create', function(req, res, next) {
console.log(req.body.content)
})

router.post('/modify', function(req, res, next) {
  
})

router.post('/delete', function(req, res, next) {
  
})

module.exports = router;
