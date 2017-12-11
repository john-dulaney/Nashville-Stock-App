// Author(s): John Dulaney
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests as well as saved stocks.
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksDashCtrl", function ($scope, $location, StocksFactory) {
        // define factory function for a quote request. may have to execute on button press
        // const functionCall = StocksFactory.quote()
        // get Form values for plugging into $http req
        // symbol, series, interval
        quoteRequest = []

        $scope.master = {}

        $scope.update = function (stock) {
            $scope.master = angular.copy(stock)
            quoteRequest.push($scope.master)
            // console.log(quoteRequest[0])
            StocksFactory.quote(quoteRequest)
            .then(response => {
                //parse return values and print them in console
                console.log(response)
                // empty arrays for our JSON return of a gaggle of objects
                const stockReturn = []
                const priceReturn = []
                const amtReturn = []

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

                console.log("current price of whatever", stockReturn[0]);

                // print it to the DOM with fancy pants Angular
                $scope.print = `Current Price of ${quoteRequest[0].symbol} = $${priceReturn[0]}`

                // loop to get price history
                for (let i = 0; i < stockReturn.length; i++) {
                    const stockPreviousHour = stockReturn[i]
                    //if statement to reduce the 900 whatever results into 20 (an hours worth)
                    if (i <= 20) {
                        //for in loop in an attempt to get the first key+value for all 20 runs
                        var valueUSD = stockPreviousHour["1. open"];
                        amtReturn.push(valueUSD)
                        // }
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

        $scope.reset = function () {
            $scope.stock = angular.copy($scope.master)
        }
        $scope.reset()

            
    }) //end of controller