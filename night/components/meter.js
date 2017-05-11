AFRAME.registerComponent('meter', {
  schema: {
    device: {type: 'selector'},
    display: {type: 'selector'}
  },

  init: function() {
    var data = this.data;
    var el = this.el;
    var self = this;
    this.size = el.components.geometry.data.width;
    this.startPosition = el.components.position.data.x

    data.device.addEventListener('powerLevelChange', function () {
      var level = data.device.components.battery.getPowerLevel();

      data.display.setAttribute('value', Math.floor(level*100) + "%");

      self.setColor(level);
      self.setSize(level);
    });
  },

  setColor: function(level) {
    var material = this.el.getAttribute('material');

    if (level > 0.75) {
      material.color='#11FF11';
    } else if (level > 0.25) {
      material.color='#FFFF11';
    } else {
      material.color='#FF1111';
    }

    this.el.setAttribute('material', material);
  },

  setSize: function(level) {
    var geometry = this.el.getAttribute('geometry');

    geometry.width = level*this.size;

    var position = this.el.getAttribute('position');

    position.x = this.startPosition - ((this.size-geometry.width)/2);

    this.el.setAttribute('geometry', geometry);
    this.el.setAttribute('position', position);
  }
});
