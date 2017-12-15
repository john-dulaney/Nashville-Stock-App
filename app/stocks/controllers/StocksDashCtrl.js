// Author(s): John Dulaney
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests as well as saved stocks.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksDashCtrl", function ($scope, $location, StocksFactory, AuthFactory, $q) {
        // watchedStockArray = []

        StocksFactory.show()
            .then(response => {

                const allQuoteRequests = []

                for (let key in response.data) {
                    let currentStock = response.data[key]
                    // console.log(StocksFactory.dashQuote(currentStock.stock))
                    allQuoteRequests.push(StocksFactory.dashQuote(currentStock.stock))
                }
                // This is wizard Dark Magic from the 4th realm. Thanks Steve!
                $q.all(allQuoteRequests)
                    .then(quoteObjectArray => {
                        $scope.allQuotes = quoteObjectArray
                        console.log(quoteObjectArray)
                        // console.log(allQuoteRequests)
                        // $scope.userEmail = AuthFactory.getUser().email
                        console.log("Response. (API, Firebase)")
                    })

            })
    })