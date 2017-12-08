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
        const StockFactory = StocksFactory.stock()
        // console.log(StockFactory)

        StocksFactory.stock()
            .then(
                response => {
                    // empty arrays for our JSON return of a gaggle of objects
                    const stockReturn = []
                    const priceReturn = []
                    // const priceReturn = []

                    // for in loop to get the BTC prices
                    for (let key in StocksFactory.cache[1]) {
                        let element = StocksFactory.cache[1][key];
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
                            for (var key in btcPreviousHour) {
                                var valueUSD = btcPreviousHour[key];
                                console.log(key, valueUSD)
                                $scope.history = `${btcPreviousHour}`
                                
                            }
                        }
                        // console.log(btcPreviousHour)
                    }
                }
            )
    })