// Author(s): John Dulaney
// Purpose: 
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksInvestCtrl", function ($scope, $location, StocksFactory) {
        $scope.investAmt = {
            value: 1
        }
        const StockFactory = CreditFactory.bitcoin()
        // console.log(StockFactory)

        CreditFactory.bitcoin()
            .then(
                response => {
                    // empty arrays for our JSON return of a gaggle of objects
                    const stockReturn = []
                    const priceReturn = []
                    const btcReturn = []

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
                    $scope.print = `Current Price of BTC = $${priceReturn[0]}`

                    // loop to get price history
                    for (let i = 0; i < stockReturn.length; i++) {
                        const btcPreviousHour = stockReturn[i]
                        //if statement to reduce the 900 whatever results into 20 (an hours worth)
                        if (i <= 20) {
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
                                    'aliceblue'
                                ],
                                borderColor: [
                                    "black"
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
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
    })