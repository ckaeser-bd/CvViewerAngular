var app = angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'app/views/employeeList.html',
          controller: 'employeeController'
      })
      .otherwise({
          redirectTo: '/'
      });
}])