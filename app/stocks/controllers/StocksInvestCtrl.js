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
                    const stockReturn = [];
                    for (let key in StocksFactory.cache[1]) {
                        let element = StocksFactory.cache[1][key];
                        stockReturn.push(element)
                    }

                    // debugger
                    for (let i = 0; i < stockReturn.length; i++) {
                        let topStocks = stockReturn[i];
                        if (stockReturn.length <= 10) {
                            console.log("loop ran if statement")
                            return topStocks
                        }
                    }
                    console.log(stockReturn);

                })
    })