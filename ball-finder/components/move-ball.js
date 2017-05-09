AFRAME.registerComponent('move-ball', {
  schema: {
    moveBy: {default: 2},
    radius: {default: 0.25},
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
      console.log('FADE');
      setTimeout(function () {
        console.log('DONE');
        el.emit('fadeDone');
      }, data.dur);
    });

    el.addEventListener('fadeDone', function () {
      console.log('MOVE');
      el.setAttribute('position', {x: component.randomPosition(), y: component.randomPosition()+1.5, z: component.randomPosition()});
      data.score = data.score + 1;
      data.record.setAttribute('value', 'Score: ' + data.score)
      el.emit('fade');
    });
  },

  randomPosition: function () {
    var moveBy = this.data.moveBy;

    var number = (Math.random()*moveBy)-(moveBy/2);
    console.log(number);
    return number;
  }
});
