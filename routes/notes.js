var express = require('express');
var Note = require('../model/note');
var router = express.Router();

router.get('/', function(req, res, next) {
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
  res.render('notes', data);
  // Note.findAll({ raw: true }).then((notes) => {
  //   //console.log(typeof notes[0].createdAt)
  //   res.render('notes', { title: '留言板', notes})
  // })
  
});
/* GET users listing. */
router.get('/api/total', function (req, res, next) {
  var user = req.session.user ? req.session.user: null
  Note.findAll({ raw: true }).then((notes) => {
    res.send({ status: 0, data: notes, user })
  })
});

router.post('/api/create', function (req, res, next) {
  //console.log(req.body.content)
  const date = new Date()
  const updateDate = date.toLocaleString()
  const { username, content } = req.body
  if (!username) {
    res.send({ status: 1, errMsg: '请登录' })
  } else {
    Note.create({ username, content, updateDate })
      .then((note) => {
        res.send({ status: 0, id: note.dataValues.id })
      }).catch(() => {
        res.send({ status: 1, errMsg: '数据库出错' })
      })
  }
})

router.post('/api/modify', function (req, res, next) {
  const date = new Date()
  const updateDate = date.toLocaleString()
  const { username, content, id } = req.body
  Note.update({ content, updateDate }, {
    where: { id, username }
  }).then((result) => {
    if (result.length === 0) {
      res.send({ status: 1, errMsg: '您没有修改该Note的权限' })
    } else {
      res.send({ status: 0, errMsg: '修改成功' })
    }
  }).catch(() => {
    res.send({ status: 1, errMsg: '数据库异常' })
  })
})

router.post('/api/delete', function (req, res, next) {
  const { username, id } = req.body
  Note.destroy(
    { where: {username, id } }
  ).then((result) => {
    if (result.length === 0) {
      res.send({ status: 1, errMsg: '您没有删除该Note的权限' })
    } else {
      res.send({ status: 0, errMsg: '删除成功' })
    }
  }).catch(() => {
    res.send({ status: 1, errMsg: '数据库异常' })
  })
})

module.exports = router;
