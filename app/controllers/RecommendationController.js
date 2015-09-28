app.controller('RecommendationController', ['$scope', '$http', '$q', function ($scope, $http, $q) {
    $scope.getMovieGenres = function () {
        $http.get('http://www.omdbapi.com/?t=' + $scope.inputMedia)
            .then(function (res) {
                return res.data;
            })
            .then(function (res) {
                $scope.movieGenreList = res.Genre.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
                getGenreList();
            })
    };
    var getGenreList = function () {
        $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=0d7be4f55135b1346fe6a0d4a9fe1563')
            .then(function (res) {
                return res.data;
            })
            .then(function (res) {
                var genres = res.genres;
                matchGenres(genres);
            });
    };
    var matchGenres = function (allGenres) {
        var genreIdArr = [];
        allGenres.forEach(function (el, idx, arr) {
            for (var i = 0; i < $scope.movieGenreList.length; i++) {
                if ($scope.movieGenreList[i] === el.name) {
                    genreIdArr.push(el.id)
                } else if ($scope.movieGenreList[i] === 'Sci-Fi') {
                    genreIdArr.push(878);
                }
            }
        });
        $scope.uniqueGenreIds = genreIdArr.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        getMovieList();
    };
    var getMovieList = function () {
        var tempArr = [];
        for (var i = 0; i < $scope.uniqueGenreIds.length; i++) {
            tempArr.push($http.get('http://api.themoviedb.org/3/genre/' + $scope.uniqueGenreIds[i] + '/movies?api_key=0d7be4f55135b1346fe6a0d4a9fe1563'));
        }
        $q.all(tempArr).then(function (res) {
            var titlesAndIdsArr = [];
            for (var i = 0; i < res.length; i++) {
                for (var x = 0; x < res[i].data.results.length; x++) {
                    titlesAndIdsArr.push(res[i].data.results[x]);
                }
            }

            var movieAndIdArr = [];
            for (var y = 0; y < titlesAndIdsArr.length; y++) {
                var movieAndIdObj = {};
                movieAndIdObj.title = titlesAndIdsArr[y].original_title;
                movieAndIdObj.ids = titlesAndIdsArr[y].genre_ids;
                movieAndIdObj.movieId = titlesAndIdsArr[y].id;
                movieAndIdArr.push(movieAndIdObj);
            }

            getRecommendations(movieAndIdArr);
        });
    };
    var getRecommendations = function (arr) {
        var recommendedMovieLists = [];
        arr.forEach(function (el, idx, arr2) {
            for (var a = 0; a < $scope.uniqueGenreIds.length; a++) {
                for (var int = 0; int < el.ids.length; int++) {
                    if ($scope.uniqueGenreIds[a] === el.ids[int]) {
                        recommendedMovieLists.push(el.title);
                        recommendedMovieLists.push(el.movieId);
                    }
                }
            }
        });
        var recommendedMovies = recommendedMovieLists.filter(function (value) {
            var index = recommendedMovieLists.indexOf(value);
            var lastIndex = recommendedMovieLists.lastIndexOf(value);
            if (index > -1 && lastIndex > -1 && lastIndex !== index) {
                return value;
            }
        });
        recommendedMovies = recommendedMovies.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
        $scope.recommendedMovies = recommendedMovies;
    };
}]);