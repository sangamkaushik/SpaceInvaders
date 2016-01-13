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
  GameView.PLAYER_BULLET_FIRE_RATE = 8; //5 per sec

  var frames=0;
  GameView.prototype.keyControls = function () {
    var ship = this.game.ship();
    var inputKeys = key.getPressedKeyCodes(); // returns an array of key codes currently pressed
    // console.log(inputKeys);
    if (typeof ship !== 'undefined'){
      ship.moveByInput(inputKeys);
    };
    if (key.isPressed("space") && frames > GameView.FPS/GameView.PLAYER_BULLET_FIRE_RATE){
      this.game.fireShipBullets.apply(this.game);
      frames = 0;
    }else{
      frames += 1;
    }
  };

  GameView.prototype.start = function () {
    this.gameTimerId = setInterval(function(){
        this.game.draw(this.ctx);
        this.game.step();
        this.keyControls();
      }.bind(this), 1000 / SpaceInvaders.GameView.FPS);
  };
})();
