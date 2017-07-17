var express = require('express');
var Note = require('../model/note');
var router = express.Router();

/* GET users listing. */
router.get('/total', function (req, res, next) {
  Note.findAll({ raw: true }).then((notes) => {
    res.send({ status: 0, data: notes })
  })
});

router.post('/create', function (req, res, next) {
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

router.post('/modify', function (req, res, next) {
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

router.post('/delete', function (req, res, next) {
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
