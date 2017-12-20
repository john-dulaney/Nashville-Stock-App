// Author(s): John Dulaney
// Purpose: This module is the controller for the inital Landing page of the site. Manages quote requests. Stored stock is in another ctrl
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller and passing in required methods/factory
    .controller("StocksQuoteCtrl", function ($scope, $location, StocksFactory) {
        // get Form values for plugging into $http req
        //form functions, save calls, some empty array/objects
        quoteRequest = []
        $scope.master = {}

        // Deprecated watch function
        // $scope.watch = function (stock) {
        //     StocksFactory.save(stock)
        // }

        // Function that runs on button press to "save" a stock to the users dashboard. 
        $scope.watchUpper = function (topStock) {
            // Call Factory function that stores the input field's value into Firebase
            StocksFactory.save(topStock)
        }

        // Request stock info from api
        $scope.request = function (stock) {
            // some angular mess that runs on the input button press, grabs the 3 values and send them off
            $scope.master = angular.copy(stock)
            // push the value into the empty array, get it into the proper scope
            quoteRequest.push($scope.master)

            console.log(quoteRequest)
            console.log("Quote request sent, enjoy the wait!")

            // call the GET factory function from StocksFactory. This is an API request from Alpha Vantage.
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
                        // push into arry for use in larger scope
                        stockReturn.push(element)
                    }

                    // Second for in loop on the keys returned, returns the first, which is the price.
                    for (let key in stockReturn[0]) {
                        let element = stockReturn[0][key];
                        // push into arry for use in larger scope
                        priceReturn.push(element)
                    }

                    console.log(quoteRequest[0])

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
                    // Chart that apparently works 
                    const ctx = $("#quoteCanvas");
                    const canvas = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ["1hr ago", "50 Min ago", "40 Min ago", "30 Min ago", "20 Min ago", "10 Min ago", "present"],
                            datasets: [{
                                label: `'Price of ${quoteRequest[0].symbol}'`,
                                data: amtReturn, // insert response data here 
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
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

        //reset function for the quote form. This does not work.
        $scope.reset = function () {
            $scope.stock = angular.copy($scope.master)
        }
        $scope.reset()


    }) //end of controller