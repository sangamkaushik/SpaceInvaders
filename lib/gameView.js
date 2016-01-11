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

  GameView.prototype.keyControls = function () {
    var ship = this.game.ship();
    var inputKeys = key.getPressedKeyCodes(); // returns an array of key codes currently pressed
    ship.moveByInput(inputKeys);
  };

  GameView.prototype.start = function () {
    this.gameTimerId = setInterval(function(){
        this.game.draw(this.ctx);
        this.keyControls();
      }.bind(this), 1000 / SpaceInvaders.GameView.FPS);
  };
})();
