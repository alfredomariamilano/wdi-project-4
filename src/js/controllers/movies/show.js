angular
.module("discovereel")
.controller("MoviesShowCtrl", MoviesShowCtrl);

MoviesShowCtrl.$inject = ["Movie", "$stateParams", "$state", "CurrentUserService", "$location"];
function MoviesShowCtrl(Movie, $stateParams, $state, CurrentUserService, $location) {
  const vm = this;
  vm.user = CurrentUserService.getUser();

  Movie.get($stateParams, data => {
    console.log(data);
      vm.movie = data;
    });
}
