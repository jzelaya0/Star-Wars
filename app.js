(function() {

  angular
    .module('swApp', [])
    .factory('SwFactory', swFactory)
    .controller('SwController', swController);

    //Dependencies Injections
    swFactory.$inject = ['$http'];
    swController.$inject = ['SwFactory']


    // ==================================================
    // FACTORY
    // ==================================================
    function swFactory(http) {
      console.log('factory');
      var swFactory = {};

      return swFactory;
    }


    // ==================================================
    // CONTROLLER
    // ==================================================

    function swController(SwFactory) {
      console.log('hello');
    }

}());
