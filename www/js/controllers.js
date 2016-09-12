angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {

  // Go To Login
  $scope.goToLogin = function() {
    $state.go('start');
  };

  $scope.toggleLeft = function() {
    console.log('Toggling left!');
    $ionicSideMenuDelegate.toggleLeft();
  }
})
