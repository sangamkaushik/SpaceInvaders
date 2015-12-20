(function() {
  if (typeof SpaceInvaders === 'undefined'){
    window.SpaceInvaders = {};
  }

  var inherits = SpaceInvaders.Util.inherits = function(childClass, parentClass){
    function Surrogate () { this.constructor = childClass };
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  }
}());
