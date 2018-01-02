// Author(s): John Dulaney
// Purpose: This module is the controller for my 'invest.html'. It manages the form on that page as well as the $http request for bitcoin DATA from my API.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksInvestCtrl", function ($scope, $location, CreditFactory) {
        //setting form value to 1
        $scope.investAmt = {
            value: 1
        }

        //request for Firebase user information for CREDITS
        CreditFactory.creditRequest()
            .then(response => {
                // pull id out for console loggin
                $scope.currentUser = response[0].id

                // pull current accounts un invested credit
                $scope.currentCredit = response[0].heldCredit

                // pull current accounts invested credit
                $scope.currentInvestedCredit = response[0].investedCredit

                console.log("Current user ID: ", response[0])
                CreditFactory.bitcoin()
            })
        // call the GET factory function for the digital currency bitcoin
        CreditFactory.bitcoin()
            .then(response => {
                    // empty arrays for our $http return of a gaggle of objects
                    const stockReturn = []
                    const priceReturn = []
                    const btcReturn = []

                    //Save credit amount committed and price of BTC at time of bet
                    $scope.bet = function (credits) {
                        // add the credit from the users input field to the amount already in firebase, store it to a variable
                        const totalInvestment = $scope.currentInvestedCredit + credits.amt

                        //call PUT factory function, pass in the summed credits as totainvestment, price of BTC at the time of bet, and the userid
                        CreditFactory.creditPut(totalInvestment, priceReturn, $scope.currentUser)
                            .then(response => {
                            $('#invest').val('')}
                        )
                    }


                    // for in loop to get the BTC prices
                    for (let key in CreditFactory.cache[1]) {
                        let element = CreditFactory.cache[1][key];
                        stockReturn.push(element)
                    }

                    // Second for in loop on the keys returned, returns the first, which is the price.
                    for (let key in stockReturn[0]) {
                        let element = stockReturn[0][key];
                        priceReturn.push(element)
                    }

                    console.log("current price of btc", stockReturn[0]);

                    // print it to the DOM with fancy pants Angular
                    $scope.print = priceReturn[0]

                    // use division on the current price of bitcoin. 1USD/USD price for 1BTC
                    $scope.btcExchangeRate = 1.00 / priceReturn[0]

                    // telling user how much USD they have invested ------------------------- TODO: NEEDS TO ADJUST WITH RISE/FALL OF BTC PRICE
                    $scope.investedValueUSD = response[0].investedCredit

                    //telling user how much BTC they have invested
                    $scope.investedValueBTC = $scope.currentInvestedCredit * $scope.btcExchangeRate
                    console.log("BTC owned after conversion", $scope.investedValueBTC)


                    // loop to get price history
                    for (let i = 0; i < stockReturn.length; i++) {
                        const btcPreviousHour = stockReturn[i]
                        //if statement to reduce the 900 whatever results into 20 (an hours worth)
                        if (i <= 7) {
                            //for in loop in an attempt to get the first key+value for all 20 runs
                            var valueUSD = btcPreviousHour["1a. price (USD)"];
                            btcReturn.push(valueUSD)
                            // console.log(btcReturn)
                        }
                    }

                    const ctx = $("#BTCcanvas");
                    const canvas = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ["1hr ago", "50 Min ago", "40 Min ago", "30 Min ago", "20 Min ago", "10 Min ago", "current"],
                            datasets: [{
                                label: `'Price of Bitcoin`,
                                data: btcReturn, // insert response data here 
                                backgroundColor: ["lightGreen"],
                                borderColor: ["black"],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            layout: {
                                padding: {
                                    left: 50,
                                    right: 50,
                                    top: 50,
                                    bottom: 50
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }]
                            }
                        }
                    });


                } // end of response
            )
    }) // end of module