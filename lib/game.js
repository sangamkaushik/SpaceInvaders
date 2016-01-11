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
      object.moveByStep([0,0]);
    });
  };
})();
