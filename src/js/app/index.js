require('../../style/index.less')
var noteFactory = require('../module/Note').noteFactory
var toastFactory = require('../module/Toast').toastFactory
var waterfall = require('../module/Waterfall').waterfall
var Observer = require('../module/Observer')

var btn_addnote = $('#header>h5').eq(0)
btn_addnote.on('click', function(){
  Observer.fire('addNote', {id: 'yanxin'})
})

// 注册addNote事件
Observer.regist('addNote', ()=>{
  noteFactory('yanxin')
})
Observer.regist('addNote', ()=>{
  toastFactory('添加成功')
})
Observer.regist('addNote', ()=>{
  waterfall('#note-list')
})

// 注册deleteNote事件
Observer.regist('deleteNote', ()=>{
  toastFactory('删除成功')
})
Observer.regist('deleteNote', ()=>{
  waterfall('#note-list')
})

// 注册modifyNote事件
Observer.regist('modifyNote', ()=>{
  toastFactory('修改成功')
})
Observer.regist('modifyNote', ()=>{
  waterfall('#note-list')
})

$(window).on('resize', ()=>{
  waterfall('#note-list')
})
// noteFactory()
// noteFactory()
// noteFactory()
// noteFactory()
// noteFactory()
// noteFactory()
//  