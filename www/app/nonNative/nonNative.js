angular.module('app')

//Config block that contains the state declaration
.config(function($stateProvider) {
  $stateProvider
 .state('nonNative', {
    url: '/nonNative',
    views: {
      "menuContent": {
        templateUrl: 'app/nonNative/nonNative.html',
        controller: 'NonNativeCtrl'
      }
    }
  });
})

.controller('NonNativeCtrl', function($scope, $state, $rootScope, $cordovaGeolocation) {
  console.log("Inside NonNativeCtrl");

  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });

  $scope.dropMarkerClick = function() {
    console.log("I'm being pressed!");

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var ll = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: ll
      });

    }, function(error){
      console.log("Could not get location");
    });
  };

  $scope.centerOnMeClick = function() {

    console.log("Center on me!");

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var ll = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      $scope.map.panTo(ll);

    }, function(error){
      console.log("Could not get location");
    });
  }

});
