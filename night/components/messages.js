AFRAME.registerComponent('messages', {
  schema: {
    additionalMessages: {type: 'array', default: ""},
    display: {type: 'selector'}
  },

  init: function() {
    var data = this.data;
    this.curMessage = 0;
    self = this;

    document.addEventListener('click', function () {
      self.nextMessage();
    });
  },

  nextMessage: function() {
    var data = this.data;
    if (this.curMessage == data.additionalMessages.length) {
      data.display.setAttribute('visible', 'false');

      document.removeEventListener('click', function () {
        self.nextMessage();
      });
    } else {
      data.display.setAttribute('value', data.additionalMessages[this.curMessage]);
      this.curMessage = this.curMessage + 1;
    }
  }
});
