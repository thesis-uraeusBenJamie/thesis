'use strict';

angular.module('thesis.login', ['ngRoute'])

.controller('LoginController', ['$scope', '$location', '$window', 'UserService', 'AuthInterceptor', '$cookies', '$rootScope', '$auth', 'toastr',
    function AdminUserCtrl($scope, $location, $window, UserService, AuthInterceptor, $cookies, $rootScope, $auth, toastr) {
        //Admin User Controller (login, logout)
        $scope.login = function login() {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email !== undefined && password !== undefined) {
                UserService.logIn(email, password).success(function(data) {
                    // $rootScope.$broadcast('userLoggedIn');
                    console.log(data);
                    // $window.sessionStorage.setItem('token', data.token);
                    // console.log($window.sessionStorage.data.token);
                    toastr.info('Welcome Back!');
                    $cookies.get('id');
                    $location.path("/profile");
                }).error(function(status, data) {
                    $location.pash("/login");
                    toastr.info('OH NO! Something is wrong with your login credentials. Please try to log in again.');
                });
            }

        };
        $scope.logout = function logout() {
            UserService.logOut().success(function(data) {
                $cookies.remove('name');
                $cookies.remove('id');
                // $rootScope.$broadcast('userLoggedOut');
                toastr.info('You have been logged out');
                $location.path("/login");
            });
        };

        $scope.profile = function() {
            if ($cookies.get('id')) {
                $location.path("/profile");
                toastr.info("Let's get that profile dolled up for you!");
            }
            $location.path("/login");
        };

        $scope.checkin = function() {
            if ($cookies.get('id')) {
                $location.path("/foursquare");
            } else{
            $location.path("/login");
            }
        };
        $scope.google = function(){
          console.log('clicked');
          UserService.google().then(function(request, response){
            AuthInterceptor.request;
            console.log(AuthInterceptor.request);
            AuthInterceptor.response;
            console.log(AuthInterceptor.response);
          })
        }
        //    $scope.authenticate = function(provider) {
        //   $auth.UserService.authenticate(provider)
        //     .then(function() {
        //       toastr.success('You have successfully signed in with ' + provider + '!');
        //       $location.path('/profile');
        //     })
        //     .catch(function(error) {
        //       if (error.error) {
        //         console.log(error);
        //         // Popup error - invalid redirect_uri, pressed cancel button, etc.
        //         toastr.error(error.error);
        //       } else if (error.data) {
        //         // HTTP response error from server
        //         toastr.error(error.data.message, error.status);
        //       } else {
        //         toastr.error(error);
        //       }
        //     });
        // };
    }
]);
