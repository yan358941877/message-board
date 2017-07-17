const Sequelize = require('sequelize')
const path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
})

// // 测试是否能连接到数据库
// sequelize
//   .authenticate()
//   .then(()=>{
//     console.log('success')
//   })
//   .catch(err => {
//     console.error(err)
//   })



// 定义一个noteinfo表
var Note = sequelize.define('noteinfo', {
  content: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
})


//往noteinfo表中插入一条数据，然后将表中的数据全部输出
// Note.sync().then(() => {
//   Note.create({
//     content: '今天完成任务',
//     username: 'yanxin'
//   })
// }).then(() => {
//   Note.findAll({raw: true}).then(note => {
//     console.log(note)
//   })
// })

module.exports = Note