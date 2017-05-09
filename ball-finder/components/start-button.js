AFRAME.registerComponent('start-button', {
  schema: {
    ball: {type: 'selector'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener('click', function () {

      console.log('START');

      el.setAttribute('visible', 'false');
      data.ball.setAttribute('move-ball', {moveBy: 6, radius: 0.1, score: -1, record: '#score'})
      data.ball.emit("click");
    });
  }
});
