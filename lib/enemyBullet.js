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
  EnemyBullet.SKIN.src = './assets/bullet2.png';
  EnemyBullet.RADIUS = 8;
  EnemyBullet.VEL = [0, 0];
  EnemyBullet.SPEED = 8;
  EnemyBullet.ANGLE = 0;

  EnemyBullet.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(EnemyBullet.SKIN, -EnemyBullet.RADIUS/2, -EnemyBullet.RADIUS/2, EnemyBullet.RADIUS, EnemyBullet.RADIUS);
    ctx.restore();
    // ctx.fillStyle = '#505050';
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
  };

  EnemyBullet.prototype.move = function () {
    this.pos[0] += this.xComponent;
    this.pos[1] += this.yComponent;
    this.angle = Math.atan2(this.yComponent, this.xComponent);
  };
})();
