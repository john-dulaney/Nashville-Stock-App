const app = angular.module("StockApp", ['ngRoute']) 

angular.module("StockApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider
        .when("/Stocks/userdash", {
            templateUrl: "app/Stocks/partials/userdash.html",
            controller: "StockDashCtrl"
        })
        .when('/Stocks/new', {
            templateUrl: 'app/Stocks/partials/create.html',
            controller: 'StocksCreateCtrl'
        })
        // .when('/Stocks/detail/:StockId', {
        //     templateUrl: 'app/Stocks/partials/detail.html',
        //     controller: 'StockDetailCtrl'
        // })
        .otherwise('/Stocks/userdash')
})