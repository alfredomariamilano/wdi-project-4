angular
.module('discovereel')
.controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state){
  const vm = this;

  User.get($stateParams, data => {
    vm.user = data.user;
  });

  vm.submit = () => {
    User
    .update($stateParams, { user: vm.user })
    .$promise
    .then(data => {
      $state.go('UsersShow', $stateParams);
    });
  };
}
