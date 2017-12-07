// Author(s): John Dulaney
// Purpose: 
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksInvestCtrl", function ($scope, $location, StocksFactory) {
        $scope.investAmt = {
            value: 1
        }
        const StockFactory = StocksFactory.stock()
        
        console.log(StockFactory)
    })