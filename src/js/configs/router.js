angular
.module('discovereel')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl as home'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl as login'
  })

  //movies Router
  .state('MoviesIndex', {
    url: '/movies',
    templateUrl: '/js/views/movies/index.html',
    controller: 'MoviesIndexCtrl as index'
  })

  .state('MoviesNew', {
    url: '/movies/new',
    templateUrl: '/js/views/movies/new.html',
    controller: 'MoviesNewCtrl as new'
  })

  .state('MoviesShow', {
    url: '/movies/:id',
    templateUrl: '/js/views/movies/show.html',
    controller: 'MoviesShowCtrl as show'
  })

  .state('MoviesEdit', {
    url: '/movies/:id/edit',
    templateUrl: '/js/views/movies/edit.html',
    controller: 'MoviesEditCtrl as edit'
  })

  //users Router
  .state('UsersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl as index'
  })
  .state('UsersShow', {
    url: '/users/:id',
    templateUrl: '/js/views/users/show.html',
    controller: 'UsersShowCtrl as show'
  })

  .state('UsersEdit', {
    url: '/users/:id/edit',
    templateUrl: '/js/views/users/edit.html',
    controller: 'UsersEditCtrl as edit'
  });

  $urlRouterProvider.otherwise('/');
}
