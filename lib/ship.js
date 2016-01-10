;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var Ship = SpaceInvaders.Ship = function(specs){
    this.radius = Ship.radius;
    this.pos = Ship.pos;
    this.vel = Ship.vel;
    SpaceInvaders.MovingObject.call(this, specs);
  };

  Ship.radius = 25;
  Ship.pos = [200, 200];
  Ship.vel = [0, 0];

  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.SKIN = new Image();
  Ship.SKIN.src = 'assets/ship.png';

})();
