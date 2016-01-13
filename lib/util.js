;(function() {
  'use strict';

  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {}
  }

  var Util = SpaceInvaders.Util = {}

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.normalizeVector = function (vector) {
    var x = vector[0];
    var y = vector[1];
    var len = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));

    x /= len;
    y /= len;

    return [x, y]
  };

  Util.vectorToPoint = function (origin, point) {
    var xDiff = origin[0] - point[0];
    var yDiff = origin[1] - point[1];

    if ((Math.abs(xDiff) < 2) && (Math.abs(yDiff) < 2)){
      // debugger;
      return [Math.PI,Math.PI];
    }else {
      return Util.normalizeVector([xDiff, yDiff]);
    }
  };

  Util.bulletVel = function(shipPos, enemyPos){
    return this.vectorToPoint(shipPos, enemyPos);
  };

  Util.tangentFromOrigin = function (pos, center) {
    var vector = vectorToPoint(pos, center);
    var tangent = [-vector[1],vector[0]];

    return tangent;
  };

  Util.distance = function(pointA, pointB){
    var xDiff = pointA[0] - pointB[0];
    var yDiff = pointA[1] - pointB[1];
    return (Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2)));
  };

  Util.isColliding = function(ship, bullet){
    return (this.distance(ship.pos, bullet.pos) < (ship.radius/2 + bullet.radius));
  };
})();
