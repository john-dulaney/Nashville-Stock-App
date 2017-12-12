// Author(s): John Dulaney
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests as well as saved stocks.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksDashCtrl", function ($scope, $location, StocksFactory) {

        // we need an automatic on load request that populates dom with saved stocks
        StocksFactory.show()
            // .then(
            //     console.log(storedStock)
            // )
    })



// we need a button that sends an $http call to server and adds to the db

// we need to be able to click on a saved stock, and be brought to a different partial with moreinfor about the clicked stock