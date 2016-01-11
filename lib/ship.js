;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var Ship = SpaceInvaders.Ship = function(specs){
    this.radius = Ship.radius;
    this.pos = Ship.pos;
    this.vel = Ship.vel;
    this.angle = Ship.angle;
    this.speed = Ship.speed;

    SpaceInvaders.MovingObject.call(this, specs);
  };

  Ship.radius = 50;
  Ship.pos = [250, 400];
  Ship.vel = [0, 0];
  Ship.speed = 3;
  Ship.angle = 0;

  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.SKIN = new Image();
  Ship.SKIN.src = './assets/ship2.png';

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-0.5*Math.PI);
    ctx.drawImage(Ship.SKIN, -Ship.radius/2, -Ship.radius/2, Ship.radius, Ship.radius);
    ctx.restore();
  };

  Ship.MOVE_STEP = 8;

  Ship.prototype.moveByInput = function(inputKeys){
    var that = this;
    inputKeys.forEach(function(k){
      if (k === 87 || k === 38) {
        that.moveByStep([0,-Ship.MOVE_STEP]);
      }else if (k === 83 || k === 40) {
        that.moveByStep([0,Ship.MOVE_STEP]);
      }else if (k === 65 || k === 37) {
        that.moveByStep([-Ship.MOVE_STEP,0]);
      }else if (k === 68 || k === 39) {
        that.moveByStep([Ship.MOVE_STEP,0]);
      }
    });

    if (this.pos[0] > SpaceInvaders.Game.DIM_X){
      this.pos[0] = SpaceInvaders.Game.DIM_X;
    }else if (this.pos[0] < 0) {
      this.pos[0] = 0;
    }

    if (this.pos[1] > SpaceInvaders.Game.DIM_Y-10) {
      this.pos[1] = SpaceInvaders.Game.DIM_Y-10;
    }else if (this.pos[1] < SpaceInvaders.Game.DIM_Y/2) {
      this.pos[1] = SpaceInvaders.Game.DIM_Y/2;
    }
  };
})();
