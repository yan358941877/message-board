require('../../style/Toast.less')

function Toast(msg, time) {
  this.msg = msg
  this.time = time || 1000
  this.toast = null
  this.createToast()
  this.showToast()
}

Toast.prototype = {
  constructor: Toast,
  createToast: function () {
    this.toast = $('<div>' + this.msg + '</div>')
    this.toast.addClass('toast')
    $('body').append(this.toast)
  },
  showToast: function () {
    if (this.toast) {
      this.toast.fadeIn(300, () => {
        setTimeout(() => {
          this.toast.fadeOut(300, () => {
            this.toast.remove()
          })
        }, this.time)
      })
    } else {
      return
    }
  },

}
function toastFactory(events){
  return new Toast(events.args.msg)
}
window.Toast = toastFactory
module.exports.toastFactory = toastFactory