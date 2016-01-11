;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  };

  var Game = SpaceInvaders.Game = function(ctx){
    this.ctx = ctx;
    this.playerShip = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.enemyShips = [];

    this.start();
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 600;

  Game.prototype.ship = function () {
    return this.playerShip[0];
  };

  Game.prototype.start = function(){
    this.addPlayer();
  };

  Game.prototype.addPlayer = function(){
    var ship = new SpaceInvaders.Ship({color: '#505050', game: this});
    this.addObject(ship);
  };

  Game.prototype.addObject = function (object) {
    if (object instanceof SpaceInvaders.Ship) {
      this.playerShip.push(object);
    }else if (object instanceof SpaceInvaders.Bullet) {
      this.playerBullets.push(object);
    }else if (object instanceof SpaceInvaders.EnemyBullet) {
      this.enemyBullets.push(object);
    }
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.playerShip, this.playerBullets, this.enemyShips, this.enemyBullets);
  };

  Game.prototype.draw = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function(object){
      object.draw(ctx);
    });
    console.log(this.allObjects().length);
  };

  Game.prototype.step = function () {
    this.allObjects().forEach(function(object){
      object.move();
    });
    this.removeOutOfBoundObjects();
  };

  Game.prototype.fireShipBullets = function (timeGap) {
    var shipPos = this.ship().pos.slice(0);
    var lBullet = new SpaceInvaders.Bullet({pos: [shipPos[0] - SpaceInvaders.Ship.BULLET_GAP, shipPos[1]]});
    var rBullet = new SpaceInvaders.Bullet({pos: [shipPos[0] + SpaceInvaders.Ship.BULLET_GAP, shipPos[1]]});
    this.addObject(lBullet);
    this.addObject(rBullet);
  };

  Game.prototype.removeOutOfBoundObjects = function () {
    this.playerBullets.forEach(function(bullet, idx){
        if(bullet.pos[0] < 0
          || bullet.pos[0] > Game.DIM_X
          || bullet.pos[1] < 0
          || bullet.pos[1] > Game.DIM_Y){
            this.playerBullets.splice(idx, 1);
          }
    }.bind(this));

    this.enemyBullets.forEach(function(bullet, idx){
        if(bullet.pos[0] < 0
          || bullet.pos[0] > Game.DIM_X
          || bullet.pos[1] < 0
          || bullet.pos[1] > Game.DIM_Y){
            this.enemyBullets.splice(idx, 1);
          }
    }.bind(this));
  };
})();
