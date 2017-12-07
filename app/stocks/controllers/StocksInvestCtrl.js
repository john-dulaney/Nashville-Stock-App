// Author(s): John Dulaney
// Purpose: 
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksInvestCtrl", function ($http, $scope, $location) {
        $scope.investAmt = {
            value: 1
        }
    })