AFRAME.registerComponent('forest', {
  schema: {
    forestBounds: {type: 'vec2', default: "20 20"},
    visibilityBounds: {type: 'vec2', default: "20 20"},
    count: {type: 'number', default: 20},
    trackObject: {type: 'selector'},
    threshold: {type: 'number', default: 10},
    start: {type: 'vec2', default: "0 0"}
  },

  init: function() {
    this.previousX = this.data.start.x;
    this.previousZ= this.data.start.y;
    this.spawnTrees();
    this.checkDistance(this.data.start.x, this.data.start.y);
  },

  spawnTrees: function() {
    var data = this.data;
    for (i = 0; i < data.count; i++){
      this.createTree((Math.random()*data.forestBounds.x)-(data.forestBounds.x/2), (Math.random()*data.forestBounds.y)-(data.forestBounds.y/2));
    }
  },

  createTree: function(x, z) {
    var tree = document.createElement('a-entity');
    tree.setAttribute('geometry', 'primitive: cylinder; height: 18; radius: 0.65');
    tree.setAttribute('material', 'transparent: true; repeat: 1 2; roughness: 0.8; src: #treeTexture');
    tree.setAttribute('position', x + ' 9 ' + z);
    tree.setAttribute('class', 'tree');
    tree.setAttribute('visible', 'false');
    this.el.appendChild(tree);
  },

  checkDistance: function(curX, curZ) {
    var self = this;

    var trees = this.el.querySelectorAll('.tree');

    for (i = 0; i < trees.length; i++){
      this.toggleVisibility(trees[i], curX, curZ);
    }
  },

  toggleVisibility: function(tree, curX, curZ) {
    var player = document.querySelector('#playerPOV');
    var playerPosition = player.components.position;

    var inX = Math.abs(curX - tree.components.position.attrValue.x) < (this.data.visibilityBounds.x/2);
    var inZ = Math.abs(curZ - tree.components.position.attrValue.z) < (this.data.visibilityBounds.y/2);

    if (inX && inZ) {
      tree.setAttribute('visible', 'true');
    } else {
      tree.setAttribute('visible', 'false');
    }
  },

  tick: function (time, timeDelta) {
      this.checkPlayerPosition();
  },

  checkPlayerPosition: function() {
    var data = this.data;
    var curX = data.trackObject.getAttribute('position').x;
    var curZ = data.trackObject.getAttribute('position').z;

    var distance = Math.sqrt(Math.pow(curX-this.previousX, 2) + Math.pow(curZ-this.previousZ, 2));

    if (distance > data.threshold) {
      this.previousX = curX;
      this.previousZ = curZ;
      this.checkDistance(curX, curZ);
    }
  }
});
