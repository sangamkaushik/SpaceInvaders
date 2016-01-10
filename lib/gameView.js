;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function(stage){
    this.stage = stage;
    this.game = new SpaceInvaders.Game(this.stage);
    this.keyControls();
  };

  GameView.MOVE_STEP = 3;
  GameView.GAME_KEYS = {
    "w": [0, -GameView.MOVE_STEP],
    "a": [-GameView.MOVE_STEP, 0],
    "s": [0, GameView.MOVE_STEP],
    "d": [GameView.MOVE_STEP, 0]
  };

  GameView.prototype.keyControls = function () {
    var ship = this.game.ship();
    Object.keys(GameView.GAME_KEYS).forEach(function(k){
      key(k, ship.moveByStep.bind(ship, GameView.GAME_KEYS[k]));
    });
    // Make the space key shoot bullets
    // key("space", ship.moveByStep.bind(ship, [1,1]));
  };

})();
