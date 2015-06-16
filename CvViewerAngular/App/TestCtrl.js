var myApp = angular.module('myApp', []);

//  Force AngularJS to call our JSON Web Service with a 'GET' rather than an 'OPTION' 
//  Taken from: http://better-inter.net/enabling-cors-in-angular-js/
myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

myApp.filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }
        return sum;
    };
})

myApp.filter('customSum', function () {
    return function (listOfProducts, key) {
        //  Count how many items are in this order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            //            alert(product + "." + key);
            total += eval("product." + key);
        });
        return total;
    }
});

myApp.filter('countItemsInOrder', function () {
    return function (listOfProducts) {
        //  Count how many items are in this order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            total += product.Quantity;
        });
        return total;
    }
});

myApp.filter('orderTotal', function () {
    return function (listOfProducts) {
        //  Calculate the total value of a particular Order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            total += product.Quantity * product.UnitPrice;
        });
        return total;
    }
});

myApp.controller('TestCtrl',
    function ($scope, $http) {

        //  here we'll load our list of employees from our JSON Web Service 
        $scope.listOfEmployees = null;

        //  When the user selects a "Employee" from our MasterView list, we'll set the following variable.
        $scope.selectedEmployee = null;

        $http.get('http://employeewebapi.azurewebsites.net/api/employee')

            .success(function (data) {
                $scope.listOfEmployees = data;

                if ($scope.listOfEmployees.length > 0) {

                    //  If we managed to load more than one Customer record, then select the first record by default.
                    //  This line of code also prevents AngularJS from adding a "blank" <option> record in our drop down list
                    //  (to cater for the blank value it'd find in the "selectedCustomer" variable)
                    $scope.selectedEmployee = $scope.listOfEmployees[0].Id;

                    //  Load the list of Orders, and their Products, that this Customer has ever made.
                    $scope.loadDetails();
                }
            })
            .error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the list of employees, error # " + status;
            });

        $scope.selectEmployee = function (val) {
            //  If the user clicks on a <div>, we can get the ng-click to call this function, to set a new selected Employee.
            $scope.selectedEmployee = val.Id;
            $scope.loadDetails();
        }

        $scope.loadDetails = function () {
            //  Reset our list of orders  (when binded, this'll ensure the previous list of orders disappears from the screen while we're loading our JSON data)
            $scope.listOfDetails = null;

            //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
            $http.get('http://employeewebapi.azurewebsites.net/api/employee/' + $scope.selectedEmployee)
                    .success(function (data) {
                        $scope.listOfDetails = data;
                         
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Details, error # " + status;
                    });
        }
    });