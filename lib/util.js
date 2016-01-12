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

  Util.prototype.normalizeVector = function (vector) {
    var x = vector[0];
    var y = vector[1];
    var len = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));

    x /= len;
    y /= len;

    return [x, y]
  };

  Util.prototype.vectorToPoint = function (origin, point) {
    var xDiff = origin[0] - point[0];
    var yDiff = origin[1] - point[1];

    return this.normalizeVector([xDiff, yDiff]);
  };

  Util.enemyShipVel = function(shipPos,enemyShip){
    return vectorToPoint(shipPos, enemyPos);
  };

  Util.prototype.tangentFromOrigin = function (pos, center) {
    var vector = vectorToPoint(pos, center);
    var tangent = [-vector[1],vector[0]];

    return tangent;
  };
})();
