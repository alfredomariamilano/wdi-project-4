angular
.module("discovereel")
.controller("MoviesIndexCtrl", MoviesIndexCtrl);

MoviesIndexCtrl.$inject = ["Movie"];
function MoviesIndexCtrl(Movie){
  const vm = this;

  Movie
  .query()
  .$promise
  .then(data => {
    console.log(data);
    vm.movies = data;
  });
}
