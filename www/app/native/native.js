angular.module('app')

//Config block that contains the state declaration
.config(function($stateProvider) {
  $stateProvider
 .state('native', {
    url: '/native',
    templateUrl: 'app/native/native.html',
    controller: 'NativeCtrl'
  });
})

.controller('NativeCtrl', function($scope, $state, $rootScope) {
  console.log("Inside NativeCtrl");

});
