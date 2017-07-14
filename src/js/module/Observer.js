var __messages = {}
var Observer = {
  // 注册信息接口
  regist: function (type, fn) {
    // 如果该类型的消息在__messages中不存在，则新建一个
    if (typeof __messages[type] === 'undefined') {
      __messages[type] = [fn]
    } else {
      __messages[type].push(fn)
    }
  },
  // 发布信息接口
  fire: function (type, args) {
    // 如果该类型的消息在__messages中没有注册，则直接返回
    if (!__messages[type]) {
      return
    }
    var events = {
      type: type,
      args: args || {}
    },
      i = 0,
      len = __messages[type].length
    for (; i < len; i++) {
      __messages[type][i].call(this, events)
    }
  },
  // 移除信息接口
  remove: function (type, fn) {
    if (__messages[type] instanceof Array) {
      var i = __messages[type].length - 1
      for (; i >= 0; i--) {
        __messages[type][i] === fn && __messages[type].splice(i, 1)
      }
    }
  }
}

module.exports = Observer