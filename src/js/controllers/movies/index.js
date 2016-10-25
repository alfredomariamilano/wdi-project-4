angular
.module("discovereel")
.controller("MoviesIndexCtrl", MoviesIndexCtrl);

MoviesIndexCtrl.$inject = ["Movie", "Viewing", "$scope"];
function MoviesIndexCtrl(Movie, Viewing, $scope){
  const vm = this;
  console.log($scope.$parent.main.user);
  vm.getMovies = ()=>{
    Movie
    .query()
    .$promise
    .then(data => {
      vm.movies = data;
      vm.movie = vm.movies[0];
    });
  };

  vm.getMovies();

  vm.setViewing = () => {
    Viewing
    .save(vm.viewing)
    .$promise
    .then(data => {
      console.log(data);
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
    vm.setViewing();
  };

  vm.notWatched = (user) => {
    vm.viewing = {
      watched: false,
      user_id: user.id,
      movie_id: vm.movie.id
    };
    vm.setViewing();
  };
}
