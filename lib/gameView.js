;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function(ctx){
    this.ctx = ctx;
    this.game = this.game || new SpaceInvaders.Game(this.ctx);
    this.keyControls();
    this.blinkCount = 0;
    this.stars = [];
  };

  GameView.FPS = 32;
  GameView.PLAYER_BULLET_FIRE_RATE = 8;
  GameView.STAR_COUNT = 100;

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

  GameView.prototype.startIntro = function () {
    clearInterval(this.gameOverTimerId);
    this.initializeStarField(GameView.STAR_COUNT);
    this.introTimerId = setInterval(function(){
        this.drawIntro(this.ctx);
      }.bind(this), 1000 / SpaceInvaders.GameView.FPS);
  };

  GameView.prototype.startGameOver = function () {
    clearInterval(this.gameTimerId);
    this.gameOverTimerId = setInterval(function() {
        this.drawGameOver(this.ctx);
      }.bind(this), 1000 / SpaceInvaders.GameView.FPS);
  };

  GameView.prototype.start = function () {
    clearInterval(this.introTimerId);
    this.game = new SpaceInvaders.Game(this.ctx);

    this.gameTimerId = setInterval(function(){
        this.game.draw(this.ctx);
        this.game.step();
        this.keyControls();
        this.updateStars();
        this.checkGameOver();
        console.log(this.game.score);
      }.bind(this), 1000 / SpaceInvaders.GameView.FPS);
  };

  GameView.prototype.drawIntro = function(ctx) {
    if(key.isPressed('enter')) {
      this.start();
    }

    ctx.clearRect(0, 0, SpaceInvaders.Game.DIM_X, SpaceInvaders.Game.DIM_Y);

    // Clear Screen
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,SpaceInvaders.Game.DIM_X, SpaceInvaders.Game.DIM_Y);

    // Heading
    ctx.fillStyle = '#FFF';
    ctx.font = "40px gameFont";
    ctx.textAlign = 'center';
    ctx.fillText("Welcome to Space Shooter", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 - 100);

    // Blinking Enter Statement
    ctx.font = "25px gameFont";

    if (this.blinkCount >= GameView.FPS) {
      this.blinkCount = 0;
    }else if (this.blinkCount > GameView.FPS - (GameView.FPS / 3)){
      this.blinkCount += 1;
    }else {
      ctx.fillText("Press 'ENTER' to Start", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 );
      this.blinkCount += 1;
    }

    ctx.font = "25px gameFont";
    ctx.textAlign = 'center'
    ctx.fillText("Controls", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 + 100);

    ctx.font = "20px gameFont";
    ctx.textAlign = 'center'
    ctx.fillText("Movement: Arrow keys or w,a,s,d", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 + 140);
    ctx.fillText("Shoot: Spacebar", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 + 170);

    this.updateStars();
  };

  GameView.prototype.drawGameOver = function(ctx) {
    if(key.isPressed('esc')) {
      this.startIntro();
    }

    ctx.clearRect(0, 0, SpaceInvaders.Game.DIM_X, SpaceInvaders.Game.DIM_Y);

    // Clear Screen
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,SpaceInvaders.Game.DIM_X, SpaceInvaders.Game.DIM_Y);

    // Heading
    ctx.fillStyle = '#FFF';
    ctx.font = "40px gameFont";
    ctx.textAlign = 'center';
    ctx.fillText("Game Over", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 - 100);

    // Blinking Enter Statement
    ctx.font = "25px gameFont";

    if (this.blinkCount >= GameView.FPS) {
      this.blinkCount = 0;
    }else if (this.blinkCount > GameView.FPS - (GameView.FPS / 3)){
      this.blinkCount += 1;
    }else {
      ctx.fillText("Press 'esc' to return to welcome screen", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 );
      this.blinkCount += 1;
    }

    ctx.font = "25px gameFont";
    ctx.textAlign = 'center'
    ctx.fillText("Your Score", SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 + 100);

    ctx.font = "20px gameFont";
    ctx.textAlign = 'center'
    ctx.fillText(this.game.score, SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y / 2 + 140);
    this.updateStars();
  };

  GameView.prototype.checkGameOver = function () {
    if (this.game.isGameOver()){
      clearInterval(this.gameTimerId);
      this.startGameOver();
    }
  };

  GameView.prototype.initializeStarField = function (numStars) {
    for (var i = 0; i < numStars; i++) {
      this.stars.push(this.randomStar());
    }
  };

  GameView.prototype.randomStar = function (yPos) {
    var y = yPos || (Math.random() * SpaceInvaders.Game.DIM_Y + 1);
    var randomStar = (new SpaceInvaders.Star({ctx: this.ctx,
                                              pos: [(Math.random() * SpaceInvaders.Game.DIM_X + 1), y],
                                              vel: [0,-1],
                                              speed: (Math.random() + 0.5),
                                              radius: (Math.random()*3 + 1)
                                              }));
    return randomStar;
  };

  GameView.prototype.updateStars = function () {
    this.stars.forEach(function(star,idx){
      star.move();
      star.draw(this.ctx);
      if (star.pos[1] > SpaceInvaders.Game.DIM_Y + 10){
        this.stars.splice(idx,1);
      }
    }.bind(this));

    var numStars = GameView.STAR_COUNT - this.stars.length;
    for (var i = 0; i < numStars; i++) {
      this.stars.push(this.randomStar(-20));
    }
  };
})();
