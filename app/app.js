var app = angular.module('otherMediaApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        //.when('/', {
        //    templateUrl: 'views/main.html',
        //    controller: 'MainController'
        //})
        .when('/', {
            templateUrl: 'views/recommendations.html',
            controller: 'RecommendationController'
        })
});