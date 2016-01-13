;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var EnemyShip = SpaceInvaders.EnemyShip = function(specs){
    this.radius = EnemyShip.RADIUS;
    this.vel = EnemyShip.VEL;
    this.angle = EnemyShip.ANGLE;
    this.speed = EnemyShip.SPEED;
    this.isWeaponized = false || specs.isWeaponized;
    this.src = specs.src;
    this.targetPos = specs.targetPos;
    this.health = 3;
    SpaceInvaders.MovingObject.call(this, specs);
  };

  EnemyShip.RADIUS = 50;
  EnemyShip.POS = [250, 400];
  EnemyShip.VEL = [0, 0];
  EnemyShip.SPEED = 3;
  EnemyShip.ANGLE = 0;
  EnemyShip.BULLET_GAP = 10;

  SpaceInvaders.Util.inherits(EnemyShip, SpaceInvaders.MovingObject);

  EnemyShip.SKIN = new Image();
  EnemyShip.SKIN.src = EnemyShip.src || './assets/ship2.png';

  EnemyShip.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(0.5*Math.PI);
    ctx.drawImage(EnemyShip.SKIN, -EnemyShip.RADIUS/2, -EnemyShip.RADIUS/2, EnemyShip.RADIUS, EnemyShip.RADIUS);
    ctx.restore();
  };

  EnemyShip.MOVE_STEP = 8;

  EnemyShip.prototype.move = function () {
    this.xComponent = this.vel[0] * this.speed;
    this.yComponent = this.vel[1] * this.speed;
    this.pos[0] += this.xComponent;
    this.pos[1] += this.yComponent;
  };

  EnemyShip.prototype.fireBullet = function () {
    var enemyShipVel = SpaceInvaders.Util.enemyShipVel(this.game.ship().pos, this.pos);
    var eBullet = new SpaceInvaders.EnemyBullet({pos: this.pos, vel: enemyShipVel});
    return eBullet;
  };
})();
