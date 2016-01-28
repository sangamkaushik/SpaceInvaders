;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var EnemyShip = SpaceInvaders.EnemyShip = function(specs){
    this.radius = specs.radius || EnemyShip.RADIUS;
    this.vel = EnemyShip.VEL;
    this.angle = EnemyShip.ANGLE;
    this.speed = specs.speed || EnemyShip.SPEED;
    this.isWeaponized = false || specs.isWeaponized;
    this.targetPos = specs.targetPos.slice(0);
    this.health = specs.health || 3;
    this.id = specs.id;
    SpaceInvaders.MovingObject.call(this, specs);
    this.SKIN = new Image();
    this.SKIN.src = specs.src;
    this.roatationAngle = specs.roatationAngle || 0.5*Math.PI;
    this.roatationAngleIncrement = specs.roatationAngleIncrement || 0;
  };

  EnemyShip.RADIUS = 50;
  EnemyShip.POS = [250, 400];
  EnemyShip.VEL = [0, 0];
  EnemyShip.SPEED = 3;
  EnemyShip.ANGLE = 0;
  EnemyShip.BULLET_GAP = 10;

  SpaceInvaders.Util.inherits(EnemyShip, SpaceInvaders.MovingObject);

  // EnemyShip.SKIN = new Image();
  // EnemyShip.SKIN.src = EnemyShip.src;// || './assets/enemyShip1.png';

  EnemyShip.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.roatationAngle);
    ctx.drawImage(this.SKIN, -EnemyShip.RADIUS/2, -EnemyShip.RADIUS/2, EnemyShip.RADIUS, EnemyShip.RADIUS);
    ctx.restore();
  };

  EnemyShip.MOVE_STEP = 8;

  EnemyShip.prototype.move = function () {
    this.xComponent = this.vel[0] * this.speed;
    this.yComponent = this.vel[1] * this.speed;
    this.pos[0] += this.xComponent;
    this.pos[1] += this.yComponent;
    this.roatationAngle += this.roatationAngleIncrement;
  };

  EnemyShip.prototype.fireBullet = function (playerShip) {
    if (typeof playerShip === 'undefined'){
      return;
    }
    var bulletVel = SpaceInvaders.Util.bulletVel(playerShip.pos.slice(0), this.pos.slice(0));
    var eBullet = new SpaceInvaders.EnemyBullet({pos: this.pos.slice(0), vel: bulletVel});
    return eBullet;
  };
})();
