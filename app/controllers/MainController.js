app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.getMovieGenres = function () {
        $http.get('http://www.omdbapi.com/?t=' + $scope.inputMedia)
            .success(function (res) {
                $scope.movieGenreList = res.Genre.replace(/^\s*|\s*$/g,'').split(/\s*,\s*/);
                console.log($scope.movieGenreList);
                $scope.getGenreList();
                //$http.get('http://api.themoviedb.org/3/genre/' + $scope.genreList + '/movies?api_key=0d7be4f55135b1346fe6a0d4a9fe1563')
            })
    };
    $scope.getGenreList = function () {
        $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=0d7be4f55135b1346fe6a0d4a9fe1563')
            .success(function (res) {
                $scope.allGenres = res.genres;
                $scope.matchGenres();
            });
    };
    $scope.matchGenres = function () {
        $scope.genreIds = [];
        $scope.allGenres.forEach(function (el, idx, arr) {
            for (var i = 0; i < $scope.movieGenreList.length; i++) {
                if ($scope.movieGenreList[i] === el.name) {
                    console.log(el);
                    $scope.genreIds.push(el.id)
                }
            }
        });
        console.log($scope.genreIds);
    };

}]);