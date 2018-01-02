// Author(s): Structure` by Steve Brownlee, High Wizard of NSS. Refactored by John Dulaney
// Purpose: This module checks the user with firebase. Changes partials based on thei auth
// ┌(° ͜ʖ͡°)┘

angular.module("StockApp").constant("FIREBASE_CONFIG", {
    apiKey: "AIzaSyAXrm0yiK2ZN7wqd39EdIVCYOOT4lvxa3Y",
    authDomain: "everyday-stock-app.firebaseapp.com",
    databaseURL: "https://everyday-stock-app.firebaseio.com",
    projectId: "everyday-stock-app",
    storageBucket: "everyday-stock-app.appspot.com",
    messagingSenderId: "270476215411"
})

let isAuth = AuthFactory => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        // console.log("User is authenticated")
        resolve()
    } else {
        // console.log("User is not authenticated, GET OUT")
        reject()
    }
})

angular.module("StockApp").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})

angular.module("StockApp").config(function ($routeProvider) {
    // debugger
    $routeProvider.
    when("/stocks/userdash", {
            templateUrl: "app/stocks/partials/userdash.html",
            controller: "StocksQuoteCtrl",
            resolve: {
                isAuth
            }
        })
        .when('/stocks/invest', {
            templateUrl: 'app/stocks/partials/invest.html',
            controller: 'StocksInvestCtrl',
            resolve: {
                isAuth
            }
        })
        .when('/stocks/quote', {
            templateUrl: 'app/stocks/partials/quote.html',
            controller: 'StocksQuoteCtrl',
            resolve: {
                isAuth
            }
        })
        .when('/stocks/about', {
            templateUrl: 'app/stocks/partials/about.html',
            // controller: '',
            resolve: {
                isAuth
            }
        })
        // .when('/stocks/modal', {
        //     templateUrl: 'app/stocks/partials/quoteModal.html',
        //     controller: 'QuoteModalCtrl.js',
        //     resolve: {
        //         isAuth
        //     }
        // })
        .when('/register', {
            templateUrl: 'app/auth/partials/register.html',
            controller: 'AuthCtrl'
        })
    // .otherwise('/register')
})



// .when('/stocks/detail/:employeeId', {
//     templateUrl: 'app/stocks/partials/detail.html',
//     controller: 'EmployeeDetailCtrl',
//     resolve: { isAuth }
// })