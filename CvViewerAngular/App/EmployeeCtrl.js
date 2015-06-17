var myApp = angular.module('myApp', []);
//var serviceUrl = 'http://localhost:8080/api/employee/';
var serviceUrl = 'http://employeewebapi.azurewebsites.net/api/employee/';

//  Force AngularJS to call our JSON Web Service with a 'GET' rather than an 'OPTION' 
//  Taken from: http://better-inter.net/enabling-cors-in-angular-js/
myApp.config([
    '$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

myApp.controller('EmployeeCtrl', function($scope, $http) {
    //  here we'll load our list of employees from our JSON Web Service 
    $scope.listOfEmployees = null;

    //  When the user selects an "Employee" from our MasterView list, we'll set the following variable.
    $scope.selectedEmployee = null;

    $http.get(serviceUrl)
        .success(function(data) {
            $scope.listOfEmployees = data;

            if ($scope.listOfEmployees.length > 0) {

                //  If we managed to load more than one Employee record, then select the first record by default.
                //  This line of code also prevents AngularJS from adding a "blank" <option> record in our drop down list
                $scope.selectedEmployee = $scope.listOfEmployees[0].Id;
                //  Load the Details
                $scope.loadDetails();
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMessage = "Couldn't load the list of employees, error # " + status;
        });

    $scope.selectEmployee = function(val) {
        //  If the user clicks on a <div>, we can get the ng-click to call this function, to set a new selected Employee.
        $scope.selectedEmployee = val.Id;
        $scope.loadDetails();
    }

    $scope.loadDetails = function() {
        //  Reset our list 
        $scope.listOfDetails = null;

        //  The user has selected an employee
        $http.get(serviceUrl + $scope.selectedEmployee)
            //$http.get('http://employeewebapi.azurewebsites.net/api/employee/' + $scope.selectedEmployee)
            .success(function(data) {
                $scope.listOfDetails = data;
            })
            .error(function(data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the list of Details, error # " + status;
            });
    }

    $scope.sendPut = function() {
        $http.put(serviceUrl + $scope.selectedEmployee, $scope.listOfDetails)
            .success(function(data, status) {
                alert(data + " " + status);
            });
    }

    $scope.sendPost = function () {
        $http.post(serviceUrl, $scope.listOfDetails)
            .success(function (data, status) {
                alert(data + " " + status);
            });
    }

    $scope.sendDelete = function () {
        $http.delete(serviceUrl + $scope.selectedEmployee)
            .success(function (data, status) {
                alert(data + " " + status);
            });
    }
});