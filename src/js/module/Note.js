require('../../style/Note.less')
function Note(position = { x: 0, y: 0 }, id) {
  this.x = position.x
  this.y = position.y
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
    $closeBtn.on("click", function(){
      // 发送一个消息，删除对应的note
    })
    var $noteContent = $('<div class="note-content" contenteditable="plaintext-only"></div>')
    $noteContent.text('请输入内容')
    $noteContent.on('blur', function(){
      //alert('结束编辑')
    })
    $noteContent.on('focus', function(){
      //alert('开始编辑')
      // 每编辑完一次，都触发一次瀑布流布局
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

function noteFactory(position = { x: 0, y: 0 }) {
  new Note(position)
}
window.noteFactory = noteFactory
module.exports.noteFactory = noteFactory