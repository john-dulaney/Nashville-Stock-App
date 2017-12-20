// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("CreditFactory", function ($http, $timeout, $location, $route, AuthFactory) {
        const firebaseURL = "everyday-stock-app.firebaseio.com"
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
            // Request User's credit info from Firebase
            "creditRequest": {
                value: function () {
                    const currentUserID = AuthFactory.authCache()
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                    method: "GET",
                                    url: `https://${firebaseURL}/storedCredits/.json?auth=${idtoken}`
                                    //&orderBy="uid"&equalTo="${currentUserID.uid}"
                                }).then(response => {
                                    // console.log(response)
                                    const data = response.data
                                    this.cache = Object.keys(data).map(key => {
                                        data[key].id = key
                                        // console.log(data[key])
                                        return data[key]
                                    })
                                    // console.log(this.cache)
                                    return this.cache
                                })
                                .catch(function (error) {
                                    console.log("Error Fetching Credit Data.")
                                })
                        })
                }
            },
            // Credit POST function for new users, simply creates their profile and awards them 100 credits.
            "creditSave": {
                value: function () {
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                method: "POST",
                                url: `https://${firebaseURL}/storedCredits/.json?auth=${idtoken}`,
                                data: {
                                    BTCpriceLog: 0,
                                    heldCredit: 100, //credits.amt,
                                    investedCredit: 0,
                                    uid: firebase.auth().currentUser.uid
                                }
                            }).catch(function (error) {
                                window.alert("Error Saving Credits.")
                            })
                        })
                }
            },
            // Credit update method for each time the user bets credits. actively updates firebase
            "creditPut": {
                value: function (totalInvestment, priceReturn, id) {
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            console.log("Credit Committed")
                            return $http({
                                method: "PUT",
                                url: `https://${firebaseURL}/storedCredits/${id}.json?auth=${idtoken}`,
                                data: {
                                    BTCpriceLog: priceReturn[0],
                                    heldCredit: 100 - totalInvestment,
                                    investedCredit: totalInvestment,
                                    uid: firebase.auth().currentUser.uid
                                }
                            }).catch(function (error) {
                                if (credits.amt === null) {
                                    window.alert("Error Saving Credits.")

                                }
                            })
                        })
                }
            }
        })
    })