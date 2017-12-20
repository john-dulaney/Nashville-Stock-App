// Author(s): John Dulaney
// Purpose: This module is the controller for my 'invest.html'. It manages the form on that page as well as the $http request for bitcoin DATA from my API.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksInvestCtrl", function ($scope, $location, CreditFactory) {
        $scope.investAmt = {
            value: 1
        }

        CreditFactory.creditRequest()
            .then(response => {
                // console.log(response)
                // debugger
                $scope.currentUser = response[0].id
                $scope.currentCredit = response[0].heldCredit
                $scope.currentInvestedCredit = response[0].investedCredit
                $scope.investedValueUSD = response[0].investedCredit
                $scope.investedValueBTC = $scope.currentInvestedCredit * 0.000060
                console.log("Current user ID: ", response[0])
                CreditFactory.bitcoin()
            })




        CreditFactory.bitcoin()
            .then(response => {
                    // empty arrays for our JSON return of a gaggle of objects
                    const stockReturn = []
                    const priceReturn = []
                    const btcReturn = []

                    //Save credit amount committed and price of BTC at time of bet
                    $scope.bet = function (credits) {
                        // debugger
                        const totalInvestment = $scope.currentInvestedCredit + credits.amt

                        CreditFactory.creditPut(totalInvestment, priceReturn, $scope.currentUser)
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
                    const btcPrice = priceReturn[0]

                    // print it to the DOM with fancy pants Angular
                    $scope.print = `${priceReturn[0]}`

                    // loop to get price history
                    for (let i = 0; i < stockReturn.length; i++) {
                        const btcPreviousHour = stockReturn[i]
                        //if statement to reduce the 900 whatever results into 20 (an hours worth)
                        if (i <= 7) {
                            //for in loop in an attempt to get the first key+value for all 20 runs
                            var valueUSD = btcPreviousHour["1a. price (USD)"];
                            btcReturn.push(valueUSD)
                            // }
                        }
                    }
                    // Chart
                    const ctx = $("#BTCcanvas");
                    const canvas = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ["1hr ago", "50 Min ago", "40 Min ago", "30 Min ago", "20 Min ago", "10 Min ago", "current"],
                            datasets: [{
                                label: 'Price of BTC',
                                data: btcReturn, // insert response data here 
                                backgroundColor: [
                                    "lightGreen"
                                    // 'rgba(255, 99, 132, 0.2)',
                                    // 'rgba(54, 162, 235, 0.2)',
                                    // 'rgba(255, 206, 86, 0.2)',
                                    // 'rgba(75, 192, 192, 0.2)',
                                    // 'rgba(153, 102, 255, 0.2)',
                                    // 'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    "black"
                                    // 'rgba(255,99,132,1)',
                                    // 'rgba(54, 162, 235, 1)',
                                    // 'rgba(255, 206, 86, 1)',
                                    // 'rgba(75, 192, 192, 1)',
                                    // 'rgba(153, 102, 255, 1)',
                                    // 'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            ayout: {
                                padding: {
                                    left: 60,
                                    right: 60,
                                    top: 60,
                                    bottom: 60
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




    // valueCheck = () => {
                //     const theSavedPrice = response[0].BTCpriceLog                    // the saved Bitcoin Value from firebase
                //     const currentPrice = priceReturn[0]                              // the current Bitcoin value

                //     if (currentPrice >= theSavedPrice) {
                //         // 1 US Dollar equals 0.000055 Bitcoin
                //         credits = credits.amt * 0.000055
                //         console.log(credits, "you gained value since your last login")
                //     } else if (priceReturn[0] < priceReference) {
                //         credits = credits.amt * 0.000055
                //         console.log(credits, "you lost money since your last login idiot")
                //     } else {
                //         console.log("something went wrong")
                //     }
                // }