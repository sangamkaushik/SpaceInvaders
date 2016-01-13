;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {};
  }

  var Wave = SpaceInvaders.Wave = function(game){
    this.count = 1;
    this.game = game;
    this.basicEnemy();
    this.fireFreq = 0.5;
  };

  Wave.prototype.updateEnemies = function () {
    var that = this;
    var isEnemyAligned = this.alignEnemies(this.game.enemyShips);
    if (!isEnemyAligned) {
      isEnemyAligned = this.alignEnemies(this.game.enemyShips);
    }else{
      this.game.enemyShips.forEach(function(ship){
        ship.pos = ship.targetPos;
      });
      return true;
    }
  };

  Wave.prototype.basicEnemy = function () {
    var target = [[100, 100], [400,100], [200, 200], [300, 200]];
    for (var i = 0; i < 4; i++) {
      this.game.addObject(new SpaceInvaders.EnemyShip({id: i, pos: [250,-100], vel: [0, 0], targetPos: target[i], src: "./assets/ship2.png"}));
    }
  };

  // Wave.prototype.mediumEnemy = function () {
  //   var enemy1 = new SpaceInvaders.EnemyShip({pos: [250,50], vel: [0, 0]});
  //   this.game.addObject(enemy1);
  // };
  //
  // Wave.prototype.hardEnemy = function () {
  //   var enemy1 = new SpaceInvaders.EnemyShip({pos: [250,50], vel: [0, 0]});
  //   this.game.addObject(enemy1);
  // };
  //
  // Wave.prototype.bossEnemy = function (first_argument) {
  //   // body...
  // };

  Wave.prototype.alignEnemies = function (enemyShips) {
    var flag = true;
    enemyShips.forEach(function(ship, idx){
      if ((ship.pos[0] !== ship.targetPos[0]) || (ship.pos[1] !== ship.targetPos[1])){
        flag = false;
        ship.vel = SpaceInvaders.Util.vectorToPoint(ship.targetPos, ship.pos);
        if (ship.vel[0] === Math.PI && ship.vel[1] === Math.PI){
          ship.vel = [0,0]
          flag = true;
        }
      }
    });
    return flag;
  };

  Wave.BASIC_FORMATIONS = [[[100, 100], [400,100], [200, 200], [300, 200]], [[100, 200], [400,200], [200, 100], [300, 100]]]

  Wave.prototype.moveEnemies = function () {
    this.game.enemyShips.forEach(function(ship, idx){
      ship.targetPos = Wave.BASIC_FORMATIONS[1][ship.id];
    });
  };

})();
