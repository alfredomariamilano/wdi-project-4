angular
.module('discovereel')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function HomeCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = () => {
    User
    .login(vm.user.login)
    .$promise
    .then(data => {
      const user = data.user ? data.user : null;
      if (user) {
        CurrentUserService.saveUser(user);
      }
    });
  };

  vm.register = () => {
    User
    .register( vm.user.register )
    .$promise
    .then(data => {
      const user = data.user ? data.user : null;
      if (user) {
        CurrentUserService.saveUser(user);
      }
    });
  };

  $('a i').click(() => {
    $('html, body').animate({ scrollTop: $('#blup').position().top }, 1000);
  });

  if (CurrentUserService.getUser()) $state.go('MoviesIndex');
}
