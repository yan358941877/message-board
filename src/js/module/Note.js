require('../../style/Note.less')
var Observer = require('./Observer')

function Note(username, content, updateDate, id) {
  this.id = id
  this.content = content
  this.username = username
  this.updateDate = updateDate
  this.$container = $('#note-list')
  this.$element = $('<li></li>')
  this.init()
}

Note.prototype = {
  constructor: Note,
  init: function () {
    var date = this.updateDate || new Date()
    this.$noteItem = $('<div class="note-item">'
      + '<div class="note-tape"></div>'
      + '</div>')

    // 删除相关
    this.$closeBtn = $('<span><i class="iconfont icon-close"></i><span>')
    this.$closeBtn.on("click", () => {
      // 发送一个消息，删除对应的note
      this.delete()
    })

    // note内容相关
    this.$noteContent = $('<div class="note-content" contenteditable="plaintext-only"></div>')
    if (!this.content){
      this.$noteContent.text('请输入内容')
    } else {
      this.$noteContent.text(this.content)
    }
    

    this.$noteContent.on('focus', () => {
      //alert('开始编辑')
      if (this.content == "请输入内容") {
        this.$noteContent.text('')
      }
      this.$element.css({ "z-index": "100" });
    })
    this.$noteContent.on('blur', () => {
      //alert('结束编辑')每编辑完一次，都触发一次瀑布流布局
      if (this.$noteContent.text() !== this.content) {
        this.modify()
        this.content = this.$noteContent.text()
      }
      if (!this.$noteContent.text()) {
        this.$noteContent.text('请输入内容')
      }
      this.$element.css({ "z-index": "10" })
    })


    // note的基本信息
    this.$noteInfo = $('<div class="note-info">'
      + '<p>' + this.username + '</p>'
      + '<p class="time">' + date.toLocaleString() + '</p>'
      + '</div>')
    this.$noteItem.append(this.$closeBtn)
    this.$noteItem.append(this.$noteContent)
    this.$noteItem.append(this.$noteInfo)

    this.$element.html(this.$noteItem)
    //this.$element.height(Math.floor(Math.random()*300))
    // 获取note的位置，并设置left和top
    //this.$element.css({"left": "30px", "top": "30px"})
    // 获取初始化条件下，note的高度，并设置note的高度
    this.$container.append(this.$element)
    // 触发一次瀑布流布局
  },
  delete: function () {
    fetch('/notes/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'yanxin', id: this.id })
    }).then(response => {
      return response.json()
    }).then(json => {
      if (json.status == 0) {
        this.$element.remove()
        Observer.fire('deleteNote')
        Observer.fire('success', {msg: '删除成功'})
      } else {
        Observer.fire('error', {msg: json.errMsg})
      }
    })
  },
  modify: function () {
    fetch('/notes/api/modify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'yanxin', id: this.id, content: this.$noteContent.text() })
    }).then(response => {
      return response.json()
    }).then(json => {
      if (json.status == 0) {
        Observer.fire('modifyNote')
        Observer.fire('success', {msg: '修改成功'})
      } else {
        Observer.fire('error', {msg: json.errMsg})
      }
    })
  }
}

function noteFactory(events) {
  //console.dir(events)
  const { username, content, updateDate, id} = events.args
  new Note(username, content, updateDate, id)
}

module.exports.noteFactory = noteFactory