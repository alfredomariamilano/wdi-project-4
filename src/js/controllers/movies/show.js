angular
.module('discovereel')
.controller('MoviesShowCtrl', MoviesShowCtrl);

MoviesShowCtrl.$inject = ['Movie', 'Viewing', '$stateParams', '$state', 'CurrentUserService', '$location', '$scope', '$sce'];
function MoviesShowCtrl(Movie, Viewing, $stateParams, $state, CurrentUserService, $location, $scope, $sce) {
  const vm = this;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  vm.user = CurrentUserService.getUser();

  Movie.get($stateParams, data => {
    vm.movie = data;
    console.log(vm.movie);
    vm.checkViewings($scope.$parent.main.user.not_watched);
    vm.stars = new Array(Math.floor(parseInt(vm.movie.vote_average)/2));
  });

  vm.updateViewings = () => {
    Viewing
    .update({id: vm.unwatched.id},{watched: true})
    .$promise
    .then(data => {
      vm.watched = false;
    });
  };

  vm.checkViewings = (viewing) => {
    vm.watched = false;
    for (var i = 0; i < viewing.length; i++) {
      if (viewing[i].movie.id === vm.movie.id) {
        vm.watched = true;
        vm.unwatched = viewing[i];
      }
    }
  };

  var amountScrolled = 300;

  $(window).scroll(function() {
    if ( $(window).scrollTop() > amountScrolled ) {
      $('div.back-to-top').fadeIn('slow');
    } else {
      $('div.back-to-top').fadeOut('slow');
    }
  });

  $('div.back-to-top').click(function(){
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });

}
