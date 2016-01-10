;(function() {
  'use strict';
  if (typeof SpaceInvaders === 'undefined') {
    window.SpaceInvaders = {}
  }

  var MovingObject = SpaceInvaders.MovingObject = function(specs){
    this.radius = this.radius || specs.radius;
    this.pos = this.pos || specs.pos;
    this.vel = this.vel || specs.vel;
    this.color = this.color || specs.color;
    this.game = this.game || specs.game;
  };

  MovingObject.prototype.draw = function (stage) {
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
    // circle.x = this.pos[0];
    // circle.y = this.pos[1];
    // var circle = new createjs.Bitmap("imagePath.jpg");

    stage.addChild(circle);
  };

  MovingObject.prototype.moveByStep = function (step) {
    this.pos[0] += step[0];
    this.pos[1] += step[1];
  };
})();
