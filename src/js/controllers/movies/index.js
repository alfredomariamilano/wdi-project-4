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
      vm.checkViewings($scope.$parent.main.user.watched);
      vm.checkViewings($scope.$parent.main.user.not_watched);
      vm.movie = vm.movies[0];
    });
  };

  vm.getMovies();

  vm.setViewing = () => {
    Viewing
    .save(vm.viewing)
    .$promise
    .then(data => {

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
    if (viewing) {
    for (var i = 0; i < viewing.length; i++) {
      var elementPos = vm.movies.map(function(x) {return x.id; }).indexOf(viewing[i].movie.id);
      var objectFound = vm.movies[elementPos];
      if (objectFound) {
        vm.movies.splice(elementPos, 1);
      }
    }
  }
  };

  var stack,
    cardElement,
    throwOutConfidenceElements;

const config = {
throwOutConfidence: (offset, element) => {
    return Math.min(Math.abs(offset) / element.offsetWidth/10, 1);
}
};

stack = gajus.Swing.Stack(config);

cardElement = document.querySelector('.stack main div div img');
throwOutConfidenceElements = {};

window.card = stack.createCard(cardElement);

stack.on('dragstart', function (e) {
    // throwOutConfidenceElements.yes = e.target.querySelector('.yes').style;
    // throwOutConfidenceElements.no = e.target.querySelector('.no').style;
});

stack.on('dragmove', function (e) {
    // throwOutConfidenceElements[e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? 'yes' : 'no'].opacity = e.throwOutConfidence;
vm.swipe = e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? 'right' : 'left';

if (vm.swipe === 'right') {
  $('.indexImage').css("background-image", "url('./images/unwatched.png')");
} else if (vm.swipe === 'left'){
  $('.indexImage').css("background-image", "url('./images/watched.png')");
}

});

stack.on('dragend', function (e) {
  if (vm.swipe === 'right') {
    vm.notWatched($scope.$parent.main.user);
  } else if (vm.swipe === 'left'){
    vm.watched($scope.$parent.main.user);
  }
});
}
