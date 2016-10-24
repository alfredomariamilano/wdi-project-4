angular
.module("discovereel")
.controller("UsersShowCtrl", UsersShowCtrl);

UsersShowCtrl.$inject = ["User", "$stateParams", "$state"];
function UsersShowCtrl(User, $stateParams, $state){
  const vm = this;

  User.get($stateParams, data => {
    console.log(data);
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
