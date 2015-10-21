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

      //Function to get all people on page load
      swFactory.getAllPeople = function(){
        return $http.get(allPeopleUrl);
      }

      //Function to get the previous page of people
      //API call on data.previous
      swFactory.getPreviousPeopleGroup = function(prev){
        return $http.get(prev);
      }

      //Function to get the next page of people
      //API call on data.next
      swFactory.getNextPeopleGroup = function(next){
        return $http.get(next);
      }

      //return the factory;
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
      vm.person = null;

      //Get list of people on Page load (10)
      vm.api.getAllPeople()
        .success(function(data){
          vm.data = data;
          vm.people = data.results;
          console.log(vm.data);
          console.log(vm.people);
        })

      //Function to Show previous list of people
      //Bind data.next to data array and pass it through the function
      vm.showPreviousPeople = function(prev){
        vm.api.getPreviousPeopleGroup(prev)
          .success(function(data){
            vm.data = data;
            vm.people = data.results;
          })
      }

      //Function to Show next list of people
      //Bind data.next to data array and pass it through the function
      vm.showNextPeople = function(next){
        vm.api.getNextPeopleGroup(next)
          .success(function(data){
            vm.data = data;
            vm.people = data.results;
            console.log(data);
          })
      }

      //Grab Individual Person Bio from vm.people
      vm.showPersonBio = function(person){
        console.log(person);
        vm.person = person;
      }

    }//End swController

}());
