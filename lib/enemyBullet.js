;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {};
  }

  var EnemyBullet = SpaceInvaders.EnemyBullet = function(specs){
    this.radius = EnemyBullet.RADIUS;
    this.vel = specs.vel;
    this.angle = specs.angle;
    this.speed = EnemyBullet.SPEED;


    SpaceInvaders.MovingObject.call(this, specs);
    // this.xComponent = parseInt(Math.sin(this.angle) * this.speed);
    // this.yComponent = parseInt(Math.cos(this.angle) * this.speed);
    this.xComponent = this.vel[0] * this.speed;
    this.yComponent = this.vel[1] * this.speed;
  };

  SpaceInvaders.Util.inherits(EnemyBullet, SpaceInvaders.MovingObject);

  EnemyBullet.SKIN = new Image();
  EnemyBullet.SKIN.src = './assets/ship.png';
  EnemyBullet.RADIUS = 7;
  EnemyBullet.VEL = [0, 0];
  EnemyBullet.SPEED = 8;
  EnemyBullet.ANGLE = 0;

  EnemyBullet.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-0.5*Math.PI);
    ctx.drawImage(EnemyBullet.SKIN, -EnemyBullet.RADIUS/2, -EnemyBullet.RADIUS/2, EnemyBullet.RADIUS, EnemyBullet.RADIUS);
    ctx.restore();
  };

  EnemyBullet.prototype.move = function () {
    this.pos[0] += this.xComponent;
    this.pos[1] += this.yComponent;
  };
})();
