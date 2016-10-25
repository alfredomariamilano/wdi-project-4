angular
.module("discovereel")
.controller("MoviesIndexCtrl", MoviesIndexCtrl);

MoviesIndexCtrl.$inject = ["Movie", "Viewing", "$scope"];
function MoviesIndexCtrl(Movie, Viewing, $scope){
  const vm = this;

  vm.getMovies = () => {
    Movie
    .query()
    .$promise
    .then(data => {
      vm.movies = data;
      console.log('before', data);
      vm.checkViewings($scope.$parent.main.user.watched);
      vm.checkViewings($scope.$parent.main.user.not_watched);
      console.log('after', data);
      vm.movie = vm.movies[0];
    });
  };

  vm.getMovies();

  vm.setViewing = () => {
    Viewing
    .save(vm.viewing)
    .$promise
    .then(data => {
      // console.log(data);
    });
    vm.movies.shift();
    vm.checkMovies();
  };

  vm.checkMovies = () => {
    if (vm.movies.length < 2){
      vm.getMovies();
    }
    vm.movie = vm.movies[0];
  };

  vm.watched = (user) => {
    vm.viewing = {
      watched: true,
      user_id: user.id,
      movie_id: vm.movie.id
    };
    $scope.$parent.main.user.watched.push({movie: {id: vm.movie.id}});
    $scope.$parent.main.user.watched.push({movie: {title: vm.movie.title}});
    vm.setViewing();
  };

  vm.notWatched = (user) => {
    vm.viewing = {
      watched: false,
      user_id: user.id,
      movie_id: vm.movie.id
    };
    $scope.$parent.main.user.not_watched.push({movie: {id: vm.movie.id}});
    $scope.$parent.main.user.not_watched.push({movie: {title: vm.movie.title}});
    vm.setViewing();
  };

  vm.checkViewings = (viewing) => {

    for (var i = 0; i < viewing.length; i++) {
      var elementPos = vm.movies.map(function(x) {return x.id; }).indexOf(viewing[i].movie.id);
      var objectFound = vm.movies[elementPos];
      if (objectFound) {
        vm.movies.splice(elementPos, 1);
      }
    }
  };
}
