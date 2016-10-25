angular
.module("discovereel")
.controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ['$http', '$rootScope', 'CurrentUserService', '$state', 'API', 'User'];
function MainCtrl($http, $rootScope, CurrentUserService, $state, API, User) {
  const vm = this;

  vm.user = CurrentUserService.getUser();

  if (vm.user) {
    User
    .query(vm.user.id)
    .$promise
    .then(data => {
      vm.user.not_watched = data[0].not_watched;
      vm.user.watched = data[0].watched;
    });
  }

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
