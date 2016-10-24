angular
  .module("discovereel")
  .controller("LoginCtrl", LoginCtrl);

LoginCtrl.$inject = ["User", "CurrentUserService"];
function LoginCtrl(User, CurrentUserService) {
  const vm = this;
  vm.login = () => {
    User
      .login(vm.user)
      .$promise
      .then(data => {
        const user = data.user ? data.user : null;
        if (user) {
          CurrentUserService.saveUser(user);
        }
      });
  };
}
