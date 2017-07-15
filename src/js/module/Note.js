require('../../style/Note.less')
var Observer = require('./Observer')

function Note(id) {
  this.id = id
  this.$container = $('#note-list')
  this.$element = $('<li></li>')
  this.init()
}

Note.prototype = {
  constructor: Note,
  init: function(){
    var date = new Date()
    var $noteItem = $('<div class="note-item">'
                  + '<div class="note-tape"></div>'
                  + '</div>')
    var $closeBtn = $('<span><i class="iconfont icon-close"></i><span>')
    $closeBtn.on("click", ()=>{
      // 发送一个消息，删除对应的note
      this.$element.remove()
      Observer.fire('deleteNote')
    })
    var $noteContent = $('<div class="note-content" contenteditable="plaintext-only"></div>')
    $noteContent.text('请输入内容')

    $noteContent.on('focus', ()=>{
      //alert('开始编辑')
      this.content = $noteContent.text()
      if(this.content=="请输入内容"){
        $noteContent.text('')
      }
      this.$element.css({"z-index": "100"});
    })
    $noteContent.on('blur', ()=>{
      //alert('结束编辑')每编辑完一次，都触发一次瀑布流布局
      if(this.content !== $noteContent.text() && $noteContent.text()){
        Observer.fire('modifyNote')
      } else {
        $noteContent.text('请输入内容')
      }
      this.$element.css({"z-index": "10"})
    })
    var $noteInfo = $('<div class="note-info">'
                  + '<p>' + this.id + '</p>'
                  + '<p class="time">' + date.toLocaleString() + '</p>'
                  + '</div>')
    $noteItem.append($closeBtn)
    $noteItem.append($noteContent)
    $noteItem.append($noteInfo)

    this.$element.html($noteItem)
    //this.$element.height(Math.floor(Math.random()*300))
    // 获取note的位置，并设置left和top
    //this.$element.css({"left": "30px", "top": "30px"})
    // 获取初始化条件下，note的高度，并设置note的高度
    this.$container.append(this.$element)
    // 触发一次瀑布流布局
  }
}

function noteFactory(id) {
  //console.dir(events.args.id)
  new Note(id)
}

module.exports.noteFactory = noteFactory