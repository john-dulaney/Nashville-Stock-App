// Author(s): John Dulaney
// Purpose: 
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("NavigationCtrl", function ($scope, $location, AuthFactory, CreditFactory) {
        $scope.isAuthenticated = () => AuthFactory.isAuthenticated();
        $scope.logout = () => AuthFactory.logout();
        $scope.userEmail = AuthFactory.getUser().email
    }
)
