// Author(s): John Dulaney
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests as well as saved stocks.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksDashCtrl", function ($scope, $location, StocksFactory, AuthFactory) {
        emptyarray = []
        console.log("Current user: ", AuthFactory.getUser().email)
        // we need an automatic on load request that populates dom with saved stocks
        StocksFactory.show()
            .then(response => {
                for (let key in response.data) {
                    let userObjects = response.data[key]
                    emptyarray.push(userObjects["stock"])
                }
                let stringArray = emptyarray.toString()
                stringArray.toUpperCase()
                console.log("Current user stored Stocks = ", stringArray.toUpperCase())
                console.log("Current user stored Stocks = ", emptyarray)

                // DEORECATED CODE BUT I DONT KNOW/FORGOT HOW TO ANGULAR.
                let resultEl = ""
                let userEmail = AuthFactory.getUser().email
                resultEl += `
                <h1>Welcome Back ${userEmail}</h1>
                <h3>Current Watched Stocks</h3>
                `
                emptyarray.forEach(stock => {
                    resultEl += ` 
                <ul>
                    <li>${stock}</li>
                </ul> `
                })
                $('#fuckMe').html(resultEl)
            })
    })



// we need a button that sends an $http call to server and adds to the db

// we need to be able to click on a saved stock, and be brought to a different partial with moreinfor about the clicked stock