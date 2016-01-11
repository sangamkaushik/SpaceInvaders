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

  Util.enemyShipVel = function(shipPos,enemyShip){
    var xDiff = shipPos[0] - enemyShip[0];
    var yDiff = shipPos[1] - enemyShip[1];

    var len = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));

    xDiff /= len;
    yDiff /= len;

    return [xDiff, yDiff];
  };
})();
