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
            // "set": {
            //     value: this.creditRequest()
            //         .then(assignCredit => {
            //             if (user === newUser) {
            //                 credits = 100
            //             } else {
            //                 credits = previouslyAssignedCreditValue
            //             }
            //         })
            // },

            
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
                    const currentUserID = AuthFactory.authCache()
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                    method: "GET",
                                    url: `https://${firebaseURL}/storedCredits/.json?auth=${idtoken}&orderBy="uid"&equalTo="${currentUserID.uid}"`
                                }).then(response => {
                                    const data = response.data
                                    this.cache = Object.keys(data).map(key => {
                                        data[key].id = key
                                        console.log(data[key])
                                        return data[key]
                                    })
                                })
                                .catch(function (error) {
                                    console.log("Error Fetching Credit Data.")
                                })
                            return this.cache
                        })
                }
            },
            "creditSave": {
                value: function (credits) {
                    console.log(credits)
                    return firebase.auth().currentUser.getToken(true)
                        .then(idtoken => {
                            return $http({
                                method: "POST",
                                url: `https://${firebaseURL}/storedCredits/.json?auth=${idtoken}`,
                                data: {
                                    credit: credit.value,
                                    uid: firebase.auth().currentUser.uid
                                }
                            }).catch(function (error) {
                                window.alert("Error Saving Credits.")
                            })
                        })
                }
            }
        })
    })