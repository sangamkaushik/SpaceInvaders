(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {};
  }

  var Wave = SpaceInvaders.Wave = function(game){
    this.count = 1;
    this.game = game;
  };

  Wave.prototype.start = function () {
    this.basicEnemy();
  };

  Wave.prototype.basicEnemy = function () {
    var enemy1 = new SpaceInvaders.EnemyShip({pos: [250,50], vel: [0, 0]});
    this.game.addObject(enemy1);
  };

  Wave.prototype.basicPath = function (first_argument) {
    // body...
  };

  Wave.prototype.alignEnemies = function (enemyShips, alignPosition) {
    // body...
  };
})();
