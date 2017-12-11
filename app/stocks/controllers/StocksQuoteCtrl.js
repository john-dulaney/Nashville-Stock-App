// Author(s): John Dulaney
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests as well as saved stocks.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksQuoteCtrl", function ($scope, $location, StocksFactory) {
        // get Form values for plugging into $http req
        // symbol, series, interval
        quoteRequest = []
        $scope.master = {}

        $scope.update = function (stock) {
            $scope.master = angular.copy(stock)
            quoteRequest.push($scope.master)
            console.log("Quote request sent, enjoy the wait!")
            StocksFactory.quote(quoteRequest)
            .then(response => {
                // empty arrays for our JSON return of a gaggle of objects
                const stockReturn = []
                const priceReturn = []
                const amtReturn = []
                console.log(StocksFactory.cache[0])

                // for in loop to get the prices
                for (let key in StocksFactory.cache[1]) {
                    let element = StocksFactory.cache[1][key];
                    stockReturn.push(element)
                }

                // Second for in loop on the keys returned, returns the first, which is the price.
                for (let key in stockReturn[0]) {
                    let element = stockReturn[0][key];
                    priceReturn.push(element)
                }

                console.log("current price of " + quoteRequest[0].symbol, stockReturn[0]);

                // print it to the DOM with fancy pants Angular
                $scope.quote = `Current Price of ${quoteRequest[0].symbol} = $${priceReturn[0]}`

                // loop to get price history
                for (let i = 0; i < stockReturn.length; i++) {
                    const stockPreviousHour = stockReturn[i]
                    //if statement to reduce the 900 whatever results into 20 (an hours worth)
                    if (i <= 20) {
                        //for in loop in an attempt to get the first key+value for all 20 runs
                        let open = stockPreviousHour["1. open"];
                        amtReturn.push(open)
                    }
                }
                //plug returned values into a chart
                // Chart
                const ctx = $("#quoteCanvas");
                const canvas = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ["1hr ago", "50 Min ago", "40 Min ago", "30 Min ago", "20 Min ago", "10 Min ago", "present"],
                        datasets: [{
                            label: `'Price of ${quoteRequest[0].symbol}'`,
                            data: amtReturn, // insert response data here 
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
                // offer the ability to add stock to dashboard

            }) //end of response
        }

        //reset function for the quote form
        $scope.reset = function () {
            $scope.stock = angular.copy($scope.master)
        }
        $scope.reset()

            
    }) //end of controller