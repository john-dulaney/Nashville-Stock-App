// Author(s): Structure by Steve Brownlee, High Wizard of NSS. Refactored by John Dulaney
// Purpose: This module acts as a factory for our user auth. Collects the information and prepares it for Firebase.
// ┌(° ͜ʖ͡°)┘

// Imports
angular.module("StockApp")
    // naming the factory, passing in appropriate angular methods
    .factory("AuthFactory", function ($http, $timeout, $location, $route) {
        // Set to null for some reason, need explanation
        let currentUserData = null

        // call firebase methods, if user is on or off, execute following if, else
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //set currentUserData to user (explains the null above), pass it into the if statement
                currentUserData = user

                // i/e in an i/e statement this checks current partial being shown
                if ($location.url() !== "/stocks/userdash") {
                    //if the user already is online and on the userdash partial, performs a reload
                    $timeout(function () {
                        $location.url("/stocks/userdash")
                    }, 500)
                } else {
                    $route.reload()
                }

            } else {
                // the users auth state changed to not online or null this method fires
                currentUserData = null
                console.log("User is not authenticated")
                // function to set the partial back to the login screen
                $timeout(function () {
                    $location.url("/register")
                }, 500)
            }
        })

        // return an obj.cr for method calling and storing later in the project
        return Object.create(null, {
            // logic for if user is authed
            isAuthenticated: {
                // value function setting user to currentUserData, used above around lines 13-15
                value: () => {
                    const user = currentUserData
                    return user ? true : false
                }
            },
            // retrieves user from firebase.
            getUser: {
                value: () => firebase.auth().currentUser
            },
            // logs user out of firebase
            logout: {
                value: () => firebase.auth().signOut()
            },
            // authentication function check the email/pw against the store values in fb
            authenticate: {
                value: credentials =>
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        credentials.email,
                        credentials.password
                    )
            },
            // creates a new user
            registerWithEmail: {
                value: user =>
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        user.email,
                        user.password
                    )
            }
        })
    })