// Author(s): John Dulaney and Steve Brownlee
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests as well as saved stocks.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksDashCtrl", function ($scope, $location, StocksFactory, AuthFactory, $q) {

        $('.carousel.carousel-slider')
            .carousel({
                    fullWidth: true
                });

        
        // Function that runs on button press to "save" a stock to the users dashboard. 
        $scope.watchUpper = function (topStock) {
            // Call Factory function that stores the input field's value into Firebase
            StocksFactory.save(topStock)
            $('#addSymbol').val('');
            // StocksFactory.dashQuote()
        }        
        
        // Call a GET factory function to get the User's stored stocks 
        StocksFactory.show()
            .then(response => {
                // empty arrays for later use
                const allQuoteRequests = []

                // For in loop on our returned object of objects
                for (let key in response.data) {
                    let currentStock = response.data[key]
                    // push a factory functions results into the array?
                    allQuoteRequests.push(StocksFactory.dashQuote(currentStock.stock))
                }
                // This is wizard Dark Magic from the 4th realm. Thanks Steve!
                $q.all(allQuoteRequests)
                    .then(quoteObjectArray => {
                        $scope.allQuotes = quoteObjectArray
                        console.log(quoteObjectArray)
                        console.log("Response. (API, Firebase)")
                    })

            })
    })