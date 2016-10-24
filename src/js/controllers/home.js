angular
  .module("discovereel")
  .controller("HomeCtrl", HomeCtrl);

HomeCtrl.$inject = ["CurrentUserService", "$state"];
function HomeCtrl(CurrentUserService, $state) {
  const vm = this;

  $state.go("register");

  if (CurrentUserService.getUser()) $state.go("MoviesIndex");
}
