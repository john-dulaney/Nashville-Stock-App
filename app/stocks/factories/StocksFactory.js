// Author(s): John Dulaney
// Purpose: 
// ┌(° ͜ʖ͡°)┘

// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("StocksFactory", function ($http, $timeout, $location, $route) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            "stock": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=USD&apikey=ZZ2RS5PN56S260FBx`
                    }).then(response => {
                        const data = response.data

                        this.cache = Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })
                        console.log(this.cache)
                        return this.cache
                    })
                }
            }
        })
    })



















// "single": {
//     value: function (key) {
//         return $http({
//             method: "GET",
//             url: ``
//             // url: `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&interval=${stockInterval}&apikey=ZZ2RS5PN56S260FBx`
//         }).then(response => {
//             return response.data
//         })
//     }
// }