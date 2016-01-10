;(function() {
  'use strict';

  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {}
  }

  var Util = SpaceInvaders.Util = {}

  var inherits = Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };
})();
