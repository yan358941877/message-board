var express = require('express');
var router = express.Router();
var Note = require('../model/note');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '留言板' });
});

router.get('/notes', function(req, res, next) {
  var data;
  if(req.session.user){
    data = {
      isLogin: true,
      user: req.session.user
    }
  }else{
    data = {
      isLogin: false
    }
  }
  data.title = '留言板'
  console.log(data)
  res.render('notes', data);
  // Note.findAll({ raw: true }).then((notes) => {
  //   //console.log(typeof notes[0].createdAt)
  //   res.render('notes', { title: '留言板', notes})
  // })
  
});
module.exports = router;