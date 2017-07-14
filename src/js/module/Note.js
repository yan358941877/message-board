require('../../style/Note.less')
function Note(position = { x: 0, y: 0 }, id) {
  this.x = position.x
  this.y = position.y
  this.id = id
  this.$container = $('.note-list')
  this.$element = $('<li></li>')
  this.init()
}

Note.prototype = {
  constructor: Note,
  init: function(){
    var date = new Date()
    var $noteItem = $('<div class="note-item">'
                  + '<div class="note-tape"></div>'
                  + '<div class="note-content"></div>'
                  + '<div class="note-info">'
                  + '<p>' + this.id + '</p>'
                  + '<p>' + date.toLocaleString() + '</p>'
                  + '</div></div>')
    var $closeBtn = $('<span><i class="iconfont icon-close"></i><span>')
    $noteItem.prepend($closeBtn)
    this.$element.html($noteItem)
    this.$element.height(Math.floor(Math.random()*300))
    this.$container.append(this.$element)
  }
}

function noteFactory(position = { x: 0, y: 0 }) {
  new Note(position)
}
window.noteFactory = noteFactory
module.exports.noteFactory = noteFactory