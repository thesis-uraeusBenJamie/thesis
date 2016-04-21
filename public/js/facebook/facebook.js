
// angular.module('thesis.facebook', ['ngRoute'])
//     .controller('FacebookController', ['$scope', '$location', '$window', 'UserService', '$cookies', '$rootScope', 
//     function AdminUserCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService, chatSocket) {
//       $window.fbAsyncInit = function() {
//         FB.init({
//           appId      : '1173846955981899',
//           xfbml      : true,
//           version    : 'v2.6'
//         });
//       };

//       (function(d, s, id){
//          var js, fjs = d.getElementsByTagName(s)[0];
//          if (d.getElementById(id)) {return;}
//          js = d.createElement(s); js.id = id;
//          js.src = "//connect.facebook.net/en_US/sdk.js";
//          fjs.parentNode.insertBefore(js, fjs);
//        }(document, 'script', 'facebook-jssdk'));
//       $scope.name = 'Login please';
//       $scope.FBLogin() = function(response) {
//         if(resposne.authResponse) {
//           console.log('Welcome catching your info...')
//           FB.api('/me', function(response) {
//             console.log('Good to see you' + response.name + '.');
//             console.log(response);
//             var accessToken = FB.getAuthResponse();
//             console.log(accessToken);
//           });
//         } else {
//           console.log('User cancelled login or did not fully authorize')
//         }
//       }
//     }
    )







