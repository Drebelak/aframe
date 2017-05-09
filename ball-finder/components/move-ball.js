AFRAME.registerComponent('move-ball', {
  schema: {
    moveBy: {default: 3},
    radius: {default: 0.5},
    dur: {default: 750},
    score: {default: 0},
    record: {type: 'selector'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var component = this;

    el.addEventListener('click', function () {
      el.emit('fade');
      data.score = data.score + 1;
      data.record.setAttribute('value', 'Score: ' + data.score);
      setTimeout(function () {
        el.emit('fadeDone');
      }, data.dur);
    });

    el.addEventListener('fadeDone', function () {
      el.setAttribute('position', {x: component.randomPosition(), y: component.randomPosition() + (data.moveBy/2), z: component.randomPosition()});
      el.emit('fade');
    });
  },

  randomPosition: function () {
    var moveBy = this.data.moveBy;

    var number = (Math.random()*moveBy)-(moveBy/2);
    return number;
  }
});
