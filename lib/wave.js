;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {};
  }

  var Wave = SpaceInvaders.Wave = function(game){
    this.waveCount = 0;
    this.fireFreq = 0.5;
    this.currentFormation = 0;
    this.game = game;
    this.basicEnemy();
    this.waveType = 'basic';
  };

  Wave.BASIC_FORMATIONS = [
                            [[100, 100], [400,100], [200, 120], [300, 120]]
                          ];
  Wave.MEDIUM_FORMATIONS = [
                              [[100, 100], [400,100], [400, 200], [100, 200]],
                              [[400, 100], [400,200], [100, 200], [100, 100]],
                              [[400, 200], [100,200], [100, 100], [400, 100]],
                              [[100, 200], [100,100], [400, 100], [400, 200]],
                            ];
  Wave.HARD_FORMATIONS = [[]];
  Wave.BOSS_FORMATIONS = [[]];

  Wave.prototype.updateEnemies = function () {
    var that = this;
    var isEnemyAligned = this.alignEnemies(this.game.enemyShips);
    if (!isEnemyAligned) {
      isEnemyAligned = this.alignEnemies(this.game.enemyShips);
    }else{
      console.log("enemy aligned");
      this.game.enemyShips.forEach(function(ship){
        ship.pos = ship.targetPos;
      });
      return true; //Returns true once enemy positions are aligned.
    }
  };

  Wave.prototype.alignEnemies = function (enemyShips) {
    var flag = true;
    var flagCount = 0;
    enemyShips.forEach(function(ship, idx){
      if ((ship.pos[0] !== ship.targetPos[0]) || (ship.pos[1] !== ship.targetPos[1])){
        flag = false;
        ship.vel = SpaceInvaders.Util.vectorToPoint(ship.targetPos, ship.pos);

        if (ship.vel[0] === Math.PI && ship.vel[1] === Math.PI){
          ship.vel = [0,0];
          flagCount += 1;
        }
      }
    });
    if (flagCount === 4){
      return true;
    }else{
      return false;
    }
  };

  Wave.prototype.basicEnemy = function () {
    for (var i = 0; i < 4; i++) {
      this.game.addObject(new SpaceInvaders.EnemyShip({
                                                        id: i,
                                                        pos: [250,-100],
                                                        vel: [0, 0],
                                                        speed: 3,
                                                        targetPos: Wave.BASIC_FORMATIONS[0][i],
                                                        roatationAngleIncrement: 0,
                                                        src: "./assets/enemyShip1.png"
                                                      })
                                                    );
    }
  };

  Wave.prototype.mediumEnemy = function () {
    for (var i = 0; i < 4; i++) {
      this.game.addObject(new SpaceInvaders.EnemyShip({
                                                        id: i,
                                                        pos: [250,-100],
                                                        vel: [0, 0],
                                                        speed: 2,
                                                        targetPos: Wave.MEDIUM_FORMATIONS[0][i],
                                                        roatationAngleIncrement: 0.01*Math.PI,
                                                        src: "./assets/enemyShip5.png"
                                                      })
                                                    );
    }
  };

  Wave.prototype.hardEnemy = function () {
    var enemy1 = new SpaceInvaders.EnemyShip({pos: [250,50], vel: [0, 0]});
    this.game.addObject(enemy1);
  };

  Wave.prototype.bossEnemy = function (first_argument) {
  };

  Wave.prototype.nextFormation = function () {
    var formation;
    switch (this.waveType) {
      case 'basic':
        formation = Wave.BASIC_FORMATIONS;
        this.currentFormation = 0;
        break;
      case 'medium':
        formation = Wave.MEDIUM_FORMATIONS;
        this.currentFormation += 1;
        if (this.currentFormation > 3){this.currentFormation = 0;}
        break;
      case 'hard':
        formation = Wave.HARD_FORMATIONS;
        this.currentFormation += 1;
        if (this.currentFormation > 3){this.currentFormation = 0;}
        break;
      case 'boss':
        formation = Wave.BOSS_FORMATIONS;
        this.currentFormation += 1;
        if (this.currentFormation > 3){this.currentFormation = 0;}
        break;
      default:
        formation = Wave.BASIC_FORMATIONS;
        break;
    }

    this.game.enemyShips.forEach(function(ship, idx){
      ship.targetPos = formation[this.currentFormation][ship.id];
    }.bind(this));
  };

  Wave.prototype.nextWave = function () { //Update wave if enemies die out.
    switch (this.waveType) {
      case 'boss':
        this.basicEnemy();
        this.waveType = 'basic';
        break;
      case 'basic':
        this.mediumEnemy();
        this.waveType = 'medium';
        break;
      case 'medium':
        this.hardEnemy();
        this.waveType = 'hard';
        break;
      case 'hard':
        this.fireFreq *= 1.2;
        this.bossEnemy();
        this.waveType = 'boss';
        break;
    }
  };
})();
