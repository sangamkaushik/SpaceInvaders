;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {};
  }

  var Bullet = SpaceInvaders.Bullet = function(specs){
    this.radius = Bullet.RADIUS;
    this.vel = Bullet.VEL;
    this.angle = Bullet.ANGLE;
    this.speed = Bullet.SPEED;

    SpaceInvaders.MovingObject.call(this, specs);
  };

  SpaceInvaders.Util.inherits(Bullet, SpaceInvaders.MovingObject);

  Bullet.SKIN = new Image();
  Bullet.SKIN.src = './assets/ship.png';
  Bullet.RADIUS = 7;
  Bullet.VEL = [0, 0];
  Bullet.SPEED = 12;
  Bullet.ANGLE = 0;

  Bullet.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-0.5*Math.PI);
    ctx.drawImage(Bullet.SKIN, -Bullet.RADIUS/2, -Bullet.RADIUS/2, Bullet.RADIUS, Bullet.RADIUS);
    ctx.restore();
  };

  Bullet.prototype.move = function () {
    this.pos[1] -= Bullet.SPEED;
  };
})();
