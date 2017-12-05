angular.module("StockApp").constant("FIREBASE_CONFIG", {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
})

let isAuth = AuthFactory => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})

angular.module("StockApp").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})

angular.module("StockApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider.
        when("/stocks/userdash", {
            templateUrl: "app/stocks/partials/userdash.html",
            controller: "StocksDashCtrl",
            resolve: { isAuth }
        })
        .when('/stocks/create', {
            templateUrl: 'app/stocks/partials/create.html',
            controller: 'StocksCreateCtrl',
            resolve: { isAuth }
        })
        // .when('/stocks/detail/:employeeId', {
        //     templateUrl: 'app/stocks/partials/detail.html',
        //     controller: 'EmployeeDetailCtrl',
        //     resolve: { isAuth }
        // })
        .when('/auth', {
            templateUrl: 'app/auth/partials/register.html',
            controller: 'AuthCtrl'
        })
        .otherwise('/auth')
})