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
      var allPeopleUrl = "http://swapi.co/api/people/?page=1&format=json"
      var swFactory = {};

      swFactory.getAllPeople = function(){
        return $http.get(allPeopleUrl);
      }

      swFactory.getPreviousPeopleGroup = function(prev){
        return $http.get(prev);
      }

      swFactory.getNextPeopleGroup = function(next){
        return $http.get(next);
      }

      return swFactory;
    }


    // ==================================================
    // CONTROLLER
    // ==================================================

    function swController(SwFactory) {
      var vm = this;
      vm.api = SwFactory;
      vm.data = []
      vm.people = [];

      vm.api.getAllPeople()
        .success(function(data){
          vm.data = data;
          vm.people = data.results;
          console.log(vm.data);
          console.log(vm.people);
        })

      vm.showNextPeople = function(next){
        vm.api.getNextPeopleGroup(next)
          .success(function(data){
            vm.data = data
            vm.people = data.results
            console.log(data);
          })
      }

    }

}());
