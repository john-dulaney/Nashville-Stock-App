// Author(s): John Dulaney
// Purpose: this module hosts a factory of functions for $http calls to the API. These functions are called in other modules
// ┌(° ͜ʖ͡°)┘

// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("StocksFactory", function ($http, $timeout, $location, $route) {
        const firebaseURL = "everyday-stock-app.firebaseio.com"
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // gets all stored data from fb, places it into the cache
            "all": {
                value: function () {
                    return firebase.auth().currentUser.getToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${firebaseURL}/storedStock/.json?auth=${idToken}`
                            }).then(response => {
                                const data = response.data
                                this.cache = Object.keys(data).map(key => {
                                    data[key].id = key
                                    return data[key]
                                })
                                return this.cache
                            })
                        })
                }
            },
            // saves stock symbol and uid into FB
            "save": {
                value: function (stock) {
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                method: "POST",
                                url: `https://${firebaseURL}/storedStock/.json?auth=${idtoken}`,
                                data: {
                                    stock: stock.symbol,
                                    uid: firebase.auth().currentUser.uid,
                                }
                            }).catch(function (error) {
                                window.alert("Error adding stock. Sry fam.")
                            })
                        })
                }
            },
            // Filter function for the stored stocks/ids to only get the objects uniqut to the current uid
            "show": {
                value: function (ay) {
                    this.all()
                        .then(function (response) {
                            response.filter(
                                storedStock => firebase.auth().currentUser.uid === storedStock.uid && storedStock.stock === ay)
                                .catch(function (error) {
                                    console.log(response)
                                    window.alert("i got this far")
                                })
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