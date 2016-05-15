(function(angular) {
    angular.module('thesis')

    .factory('chatSocket', function(socketFactory) {
            return socketFactory();
        })
        .factory('AuthInterceptor', function($window, $q) {
            return {
                request: function(config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.getItem('token')) {
                        config.headers.Authorization = $window.sessionStorage.getItem('token');
                    }
                    console.log(config.headers);
                    return config || $q.when(config);
                },
                response: function(response) {
                    if (response.status === 401) {
                        // TODO: Redirect user to login page.
                        config.headers.Authorization = $window.sessionStorage.getItem('token');
                    }
                    return response || $q.when(response);
                }
            };
        })
        .factory('UserService', function($http, $cookies, $location) {
            var self = this;

            return {
                logIn: function(email, password) {
                    return $http.post('/login', {
                        email: email,
                        password: password
                    });

                },
                logOut: function() {
                    return $http.get('/logout');
                },
                signUp: function(email, password, nameFirst, nameLast, username) {
                    return $http.post('/signup', {
                        email: email,
                        password: password,
                        nameFirst: nameFirst,
                        nameLast: nameLast,
                        username: username
                    });
                },
                joinchat: function(id) {
                    return $http.post('/joinchat', {
                        id: id,
                        idSender: $cookies.get('id')
                    });
                },
                createMSG: function(msg, chatId, userId) {
                    return $http.post('/createMSG', {
                        message: msg,
                        chatId: chatId,
                        userId: userId
                    });
                },
                google: function() {
                    return $http.get("/auth/google")
                }
            };
        });
})(window.angular);
