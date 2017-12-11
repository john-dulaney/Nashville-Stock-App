// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("CreditFactory", function ($http, $timeout, $location, $route) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // this GET is temporary
            "bitcoin": {
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
                        return this.cache
                    })
                }
            },
            "creditRequest": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: `https://everyday-stock-app.firebaseio.com/Credits`
                    }).then(response => {
                        return this.cache
                    })
                }
            },
            "creditSend": {
                value: function () {
                    return $http({
                        method: "PUT",
                        url: `https://everyday-stock-app.firebaseio.com/Credits`
                    }).then(response => {
                        return this.cache
                    })
                }
            }
        })
    })