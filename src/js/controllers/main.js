angular
  .module("discovereel")
  .controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ['$http', '$rootScope', 'CurrentUserService', '$state', 'API'];
function MainCtrl($http, $rootScope, CurrentUserService, $state, API) {
  const vm = this;

  vm.greeting = 'test';

//   $http({
//   method: 'GET',
//   url: `${API}/movies`
// }).then((response) => {
//   console.log(response);
// }, (response) => {
//     console.log('bluuuup', response);
//   });

  vm.user = CurrentUserService.getUser();

  vm.logout = () => {
    event.preventDefault();
    CurrentUserService.clearUser();
  };

  $rootScope.$on("loggedIn", () => {
    vm.user = CurrentUserService.getUser();
    $state.go("MoviesIndex");
  });

  $rootScope.$on("loggedOut", () => {
    vm.user = null;
    $state.go("home");
  });
}
