angular
  .module("discovereel")
  .controller("RegisterCtrl", RegisterCtrl);

RegisterCtrl.$inject = ["User", "CurrentUserService"];
function RegisterCtrl(User, CurrentUserService){
  const vm    = this;
  
  vm.register = () => {
    console.log(vm.user);
    User
      .register( vm.user )
      .$promise
      .then(data => {
        const user = data.user ? data.user : null;
        if (user) {
          CurrentUserService.saveUser(user);
        }
      });
  };
}
