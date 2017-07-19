require('../../style/index.less')

const noteFactory = require('../module/Note').noteFactory
const toastFactory = require('../module/Toast').toastFactory
const waterfall = require('../module/Waterfall').waterfall
const Observer = require('../module/Observer')

fetch('notes/api/total').then(response => {
    return response.json()
  }).then(json => {
    const status = json.status
    if(status===0){
      const data = json.data
      data.forEach(note => {
        const {username, content, updateDate, id} = note
        Observer.fire('addNote', {username, content, updateDate, id})
      })
    } else {
      Observer.fire('error', {msg: json.errMsg})
    }
  }).catch(()=>{
    Observer.fire('error', {msg: '服务器异常，请稍后再试'})
  })

waterfall('#note-list');
var btn_addnote = $('#header>h5').eq(0)

btn_addnote.on('click', function(){
  fetch('/notes/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'yanxin', content: '请输入内容'})
  }).then(response => {
    return response.json()
  }).then(json => {
    if(json.status == 0){
      Observer.fire('addNote', {id: json.id})
      Observer.fire('success', {msg: '添加成功'})
    } else {
      Observer.fire('error', {msg: json.errMsg})
    }
  })
})

// 注册addNote事件
Observer.regist('addNote', (events)=>{
  noteFactory(events)
})
Observer.regist('addNote', ()=>{
  waterfall('#note-list')
})

// 注册deleteNote事件
Observer.regist('deleteNote', ()=>{
  waterfall('#note-list')
})

// 注册modifyNote事件
Observer.regist('modifyNote', ()=>{
  waterfall('#note-list')
})

// 成功消息
Observer.regist('success', (events)=>{
  toastFactory(events)
})
// 错误消息
Observer.regist('error', (events)=>{
  toastFactory(events)
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