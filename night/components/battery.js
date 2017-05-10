AFRAME.registerComponent('battery', {
  schema: {
    device: {type: 'selector'},
    maxPower: {type: 'number', default: 100},
    drainRate: {type: 'number', default: 250},
    rechargeRate: {type: 'number', default: 500}
  },

  init: function() {
    var data = this.data;
    var el = this.el;
    this.currentPower = data.maxPower;
    this.discharge = false;
    var self = this;

    data.device.addEventListener('powerOn', function () {
      self.discharge = true;
      self.drain();
    });

    data.device.addEventListener('powerOff', function () {
      self.discharge = false;
      self.recharge();
    });
  },

  drain: function() {
    var self = this;
    var curPower = this.currentPower;
    if((this.discharge == false)) {
      return;
    }
    if(curPower == 0) {
      this.el.emit('outOfPower');
      return;
    }

    this.currentPower = curPower - 1;
    setTimeout(function() {self.drain();}, this.data.drainRate);
  },

  recharge: function() {
    var self = this;
    var curPower = this.currentPower;
    if(this.discharge == true || (curPower == this.data.maxPower)) {
      return;
    }

    this.currentPower = curPower + 1;
    setTimeout(function() {self.recharge()}, this.data.rechargeRate);
  }

});
