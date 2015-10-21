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
    function swFactory($http) {
      console.log('factory');
      var allPeopleUrl = 'http://swapi.co/api/people/?format=json'
      var swFactory = {};

      swFactory.getAllPeople = function(){
        return $http.get(allPeopleUrl);
      }

      return swFactory;
    }


    // ==================================================
    // CONTROLLER
    // ==================================================

    function swController(SwFactory) {
      var vm = this;
      vm.api = SwFactory;

      vm.api.getAllPeople()
        .success(function(data){
          console.log(data);
        })

    }

}());
