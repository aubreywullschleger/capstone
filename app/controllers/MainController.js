app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.getMovies = function () {
        $http.get('http://www.omdbapi.com/?t=' + $scope.inputMedia)
            .success(function (res) {
                $scope.movieList = res.Genre;
            })
    };
}]);