// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("CreditFactory", function ($http, $timeout, $location, $route) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
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