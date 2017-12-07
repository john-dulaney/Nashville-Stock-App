// Author(s): John Dulaney
// Purpose: 
// ┌(° ͜ʖ͡°)┘

// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("StocksInvestFactory", function ($http, $timeout, $location, $route) {
        return Object.create(null, {
            invest: {
                value: () => {
                    console.log($scope.creditInvest.value())
                }
            }
        })
    })