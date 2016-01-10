;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function(ctx){
    this.ctx = ctx;
    this.game = new SpaceInvaders.Game(this.ctx);
    this.keyControls();
  };

  GameView.FPS = 32;
  // GameView.GAME_KEYS = {
  //   "w": [0, GameView.MOVE_STEP],
  //   "a": [GameView.MOVE_STEP, 0],
  //   "s": [0, GameView.MOVE_STEP],
  //   "d": [GameView.MOVE_STEP, 0]
  // };

  GameView.prototype.keyControls = function () {
    var ship = this.game.ship();
    var inputKeys = key.getPressedKeyCodes(); // returns an array of key codes currently pressed
    console.log(inputKeys);
    ship.moveByInput(inputKeys);

    // Object.keys(GameView.GAME_KEYS).forEach(function(k){
    //   key(k, ship.moveByStep.bind(ship, GameView.GAME_KEYS[k]));
    // });
    // Make the space key shoot bullets
    // key("space", ship.moveByStep.bind(ship, [1,1]));
  };

  GameView.prototype.start = function () {
    this.gameTimerId = setInterval(function(){
        this.game.draw(this.ctx);
        this.keyControls();
      }.bind(this), 1000 / SpaceInvaders.GameView.FPS);
  };
})();
