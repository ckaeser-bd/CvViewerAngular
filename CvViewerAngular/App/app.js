var app = angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'app/views/home.html',
          controller: 'homeController'
      })
      .when('/about', {
          templateUrl: 'app/views/about.html',
          controller: 'aboutController'
      })
      .otherwise({
          redirectTo: '/'
      });
}])
.controller('mainController', function ($scope) {
    $scope.message = "Main Content";
});;

