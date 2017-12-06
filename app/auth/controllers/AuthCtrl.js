// Author(s): Structure by Steve Brownlee, High Wizard of NSS. Refactored by John Dulaney
// Purpose: Controller for FB registration. Link between the form, and the methods to fb
// ┌(° ͜ʖ͡°)┘

// imports
angular.module("StockApp")
    // naming this controller, AuthCtrl, and passing in required methods/factory
    .controller("AuthCtrl", function ($scope, $location, AuthFactory) {
        // setting .auth call from fb into an empty object
        $scope.auth = {}

        //login function, passing in credentials
        $scope.logMeIn = function (credentials) {
            //calling AuthFactory.authenticate function. 
            AuthFactory.authenticate(credentials).then(function (didLogin) {
                //Places credentials from email/pw into objects ready to be sent to firebase.
                $scope.login = {}
                $scope.register = {}
                $location.url("/stocks/userdash")
            })
        }

        //logout function (obviously)
        $scope.logoutUser = function () {
            // calls .logout from the factory
            AuthFactory.logout()
            // returns user to register partial
            $location.url('/register')
        }

        // register function passing in registerNewUser
        $scope.registerUser = function (registerNewUser) {

            //runs  function that stores a new user in firebase
            AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
                // runs login function so once user is registered, they are sent along.
                logMeIn(registerNewUser)
            })
        }

    })