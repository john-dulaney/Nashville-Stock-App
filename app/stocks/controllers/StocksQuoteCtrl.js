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

        $('.carousel.carousel-slider')
        .carousel({
                fullWidth: true
            });

        // Function that runs on button press to "save" a stock to the users dashboard. 
        $scope.watchUpper = function (topStock) {
            // Call Factory function that stores the input field's value into Firebase
            StocksFactory.save(topStock)
            // StocksFactory.dashQuote()
            $scope.reset()
        }

        //reset function for the quote form. This does not work.
        $scope.reset = function () {
            $scope.stock = angular.copy($scope.master)
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

                    const ctx = $("#quoteCanvas");
                    const canvas = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ["3hr", "150min", "2hr", "90min", "1hr", "30min", "Present"],
                            datasets: [{
                                label: `'Price of ${quoteRequest[0].symbol}'`,
                                data: amtReturn, // insert response data here 
                                backgroundColor: ["grey darken-4"],
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
                    // offer the ability to add stock to dashboard

                }) //end of response
        }
    }) //end of controller




     // $scope.oneMinArray = ["7min", "6min", "5min", "4min", "3min", "2min", "1min"]
                    // $scope.fiveMinArray = ["30min", "25min", "20min", "15min", "10min", "5min", "Present"]
                    // $scope.fifteenMinArray = ["90min", "75min", "1hr", "45min", "30min", "15min", "Present"]
                    // $scope.thirtyMinArray = ["3hr", "150min", "2hr", "90min", "1hr", "30min", "Present"]
                    // $scope.sixtyMinArray = ["6hr", "5hr", "4hr", "3hr", "2hr", "60min", "Present"]


                    // const mapLabels = []

                    // function chartLabelChecker() {
                    //     debugger
                    //     const oneMin = $("#1min")
                    //     const fiveMin = $("#5min")
                    //     const fifteenMin = $("#15min")
                    //     const thirtyMin = $("#30min")
                    //     const sixtyMin = $("#60min")

                    //     // past - > present
                    //     if (oneMin.checked === true) {
                    //         let oneMinLabels = ["7min", "6min", "5min", "4min", "3min", "2min", "1min"]
                    //         mapLabels.push(oneMinLabels)
                    //         // return mapLabels
                    //     } else if (fiveMin.checked === true) {
                    //         let fiveMinLabels = ["30min", "25min", "20min", "15min", "10min", "5min", "Present"]
                    //         mapLabels.push(fiveMinLabels)
                    //         // return mapLabels
                    //     } else if (fifteenMin.checked === true) {
                    //         let fifteenMinLabels = ["90min", "75min", "1hr", "45min", "30min", "15min", "Present"]
                    //         mapLabels.push(fifteenMinLabels)
                    //         // return mapLabels
                    //     } else if (thirtyMin.checked === true) {
                    //         let thirtyMinLabels = ["3hr", "150min", "2hr", "90min", "1hr", "30min", "Present"]
                    //         mapLabels.push(thirtyMinLabels)
                    //         // return mapLabels
                    //     } else if (sixtyMin.checked === true) {
                    //         let sixtyrMinLabels = ["6hr", "5hr", "4hr", "3hr", "2hr", "60min", "Present"]
                    //         mapLabels.push(sixtyMinLabels)
                    //         // return mapLabels
                    //     }
                    // }


                    //plug returned values into a chart
                    // Chart that apparently works 
                    // chartLabelChecker()
                    //     .then(function chartjs() {