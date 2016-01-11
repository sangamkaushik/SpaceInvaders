;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var Ship = SpaceInvaders.Ship = function(specs){
    this.radius = Ship.RADIUS;
    this.pos = Ship.POS;
    this.vel = Ship.VEL;
    this.angle = Ship.ANGLE;
    this.speed = Ship.SPEED;

    SpaceInvaders.MovingObject.call(this, specs);
  };

  Ship.RADIUS = 50;
  Ship.POS = [250, 400];
  Ship.VEL = [0, 0];
  Ship.SPEED = 3;
  Ship.ANGLE = 0;
  Ship.BULLET_GAP = 10;

  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.SKIN = new Image();
  Ship.SKIN.src = './assets/ship.png';

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-0.5*Math.PI);
    ctx.drawImage(Ship.SKIN, -Ship.RADIUS/2, -Ship.RADIUS/2, Ship.RADIUS, Ship.RADIUS);
    ctx.restore();
  };

  Ship.MOVE_STEP = 8;

  Ship.prototype.moveByInput = function(inputKeys){
    var that = this;
    inputKeys.forEach(function(k){
      if (k === 87 || k === 38) {//W
        that.moveByStep([0,-Ship.MOVE_STEP]);
      }else if (k === 83 || k === 40) {//S
        that.moveByStep([0,Ship.MOVE_STEP]);
      }else if (k === 65 || k === 37) {//A
        that.moveByStep([-Ship.MOVE_STEP,0]);
      }else if (k === 68 || k === 39) {//D
        that.moveByStep([Ship.MOVE_STEP,0]);
      }else if (k === 32) {
        // that.game.fireShipBullets();
      }else{
        // that.vel = [0,0];
      }
    });
    this.checkBounds();
  };

  Ship.prototype.checkBounds = function () {
    //Not let Ship do out of screen on x-axis
    if (this.pos[0] + Ship.RADIUS/2 > SpaceInvaders.Game.DIM_X){
      this.pos[0] = SpaceInvaders.Game.DIM_X - Ship.RADIUS/2;
    }else if (this.pos[0] - Ship.RADIUS/2 < 0) {
      this.pos[0] = 0 + Ship.RADIUS/2;
    }
    //Not let Ship do out of screen on y-axis
    if (this.pos[1] > SpaceInvaders.Game.DIM_Y-10) {
      this.pos[1] = SpaceInvaders.Game.DIM_Y-10;
    }else if (this.pos[1] < SpaceInvaders.Game.DIM_Y/2) {
      this.pos[1] = SpaceInvaders.Game.DIM_Y/2;
    }
  };

  Ship.prototype.move = function () {

  };
})();
