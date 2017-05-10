AFRAME.registerComponent('flashlight', {
  schema: {
    onOff: {type: 'number', default: 101}, // 69 is e
    light: {type: 'selector'},
    interval: {type: 'number', default: 30},
    maxFlicker: {type: 'number', default: 8}
  },

  init: function() {
    var data = this.data;
    var el = this.el;
    var self = this;

    this.flicker();

    document.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;

      if (key === data.onOff) {
        self.toggleLight();
      }
    });
  },

  flicker: function() {
    var data = this.data;
    var self = this;
    var numFlicker = Math.ceil(Math.random()*data.maxFlicker);

    this.delay(0, numFlicker);

    setTimeout(function() {
      self.flicker();
    }, (data.interval*1000*Math.random()));
  },

  toggleLight: function() {
    this.data.light.setAttribute('visible', !this.data.light.getAttribute('visible'));
  },

  setIntensity: function(value) {
    this.data.light.setAttribute('intensity', value);
  },

  delay: function(count, iterations) {
    var self = this;
    if(count == iterations) {
      self.setIntensity(1);
      return;
    }

    this.setIntensity(Math.random());
    setTimeout(function() {
      self.setIntensity(1);
      self.delay(count+1, iterations);
    }, (Math.floor(Math.random() * (300-50)) + 50));
  }
});
