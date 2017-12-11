const movieFactory = Object.create(null, {
    //GET ALL MOVIES FROM DATABASE -> RETURN THE CACHED ARRAY WITH FIREBASEID AS A VALUE IN THE MOVIE OBJECT
    "all": {
        value: function () {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $http({
                        "url": ``,
                        "method": "GET"
                    }).then(movies => {
                        this.cache = Object.keys(movies).map(key => {
                            movies[key].firebaseId = key
                            return movies[key]
                        })
                        return this.cache
                    })
                })
        }
    },
    //ADD MOVIE TO FIREBASE with userId, watched status, and rating
    "add": {
        value: function (movie) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/movies/.json?auth=${idToken}`,
                        "method": "POST",
                        "data": JSON.stringify({
                            "movie": movie,
                            "uid": firebase.auth().currentUser.uid,
                            "watched": false,
                            "rating": 0
                        })
                    })
                }).catch(function (error) {
                    window.alert("Error while adding the movie. Please try again.")
                })
        }
    },
    //DELETE MOVIE FROM FIREBASE
    "remove": {
        value: function (e) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/movies/${e.target.id}/.json?auth=${idToken}`,
                        "method": "DELETE"
                    }).then(() => {
                        $(e.target.parentElement).remove()
                    })
                })
        }
    }
})