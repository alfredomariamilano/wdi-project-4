angular
.module("discovereel")
.controller("UsersShowCtrl", UsersShowCtrl);

UsersShowCtrl.$inject = ["User", "$stateParams", "$state", "$scope"];
function UsersShowCtrl(User, $stateParams, $state, $scope){
  const vm = this;

  User.get($stateParams, data => {
    vm.user = data;
    $scope.$parent.main.user = data;
  });

  vm.userDelete = () => {
    User
    .delete($stateParams)
    .$promise
    .then(data => {
      $state.go("UsersIndex");
    });
  };
}
