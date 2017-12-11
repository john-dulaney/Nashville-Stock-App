// Author(s): John Dulaney
// Purpose: this module hosts a factory of functions for $http calls to the API. These functions are called in other modules
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
            "save": {
                value: function (stock) {
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                method: "POST",
                                url: `https://everyday-stock-app.firebaseio.com/storedStock/.json?auth=${idtoken}`,
                                data: JSON.stringify({
                                    stock: stock,
                                    uid: firebase.auth().currentUser.uid,
                                })
                            }).catch(function (error) {
                                window.alert("Error adding stock. Sry fam.")
                            })
                        })
                }
            },
            "show": {
                value: function (stock) {
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                method: "GET",
                                url: `https://everyday-stock-app.firebaseio.com/storedStock/.json?auth=${idtoken}`,
                            })
                            // .catch(function (error) {
                            //     window.alert("Error adding stock. Sry fam.")
                            // })
                            return this.cache
                        })

                }
            },
            // this GET will be used for BTC as well, once it works
            "quote": {
                value: function (quoteRequest) {
                    return $http({
                        method: "GET",
                        url: `https://www.alphavantage.co/query?function=TIME_SERIES_${quoteRequest[0].series}&symbol=${quoteRequest[0].symbol}&interval=${quoteRequest[0].interval}&apikey=ZZ2RS5PN56S260FBx`
                        // 1. the market to draw from  = quoteRequest[0].series
                        // 2. 3-4 letters symbol = quoteRequest[0].symbol
                        // 3. interval of data = quoteRequest[0].interval
                    }).then(response => {
                        const data = response.data
                        this.cache = Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })
                        return this.cache
                    })
                }
            }
        })
    })