;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  };

  var Game = SpaceInvaders.Game = function(stage){
    this.stage = stage;
    this.playerShip = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.enemyShips = [];

    this.start();
  };

  Game.prototype.respawn = function(){

  };

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
    var that = this;
    this.allObjects().forEach(function(object){
      object.draw(that.stage);
    });
  };
})();
