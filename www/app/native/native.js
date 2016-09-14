angular.module('app')

//Config block that contains the state declaration
.config(function($stateProvider) {
  $stateProvider
 .state('native', {
    url: '/native',
    views: {
      "menuContent": {
        templateUrl: 'app/native/native.html',
        controller: 'NativeCtrl'
      }
    }
  });
})

.controller('NativeCtrl', function($scope, $state, $rootScope, $cordovaGeolocation) {
  console.log("Inside NativeCtrl");

  document.addEventListener("deviceready", function() {
    var div = document.getElementById("map_canvas");

    // Initialize the map view
    $scope.map = plugin.google.maps.Map.getMap(div);

    // Wait until the map is ready status.
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
  }, false);

  function onMapReady() {
    var button = document.getElementById("button");
    button.addEventListener("click", onBtnClicked, false);
  }

  function onBtnClicked() {
    map.showDialog();
  }

  $scope.centerOnMeClick = function() {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var ll = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // $scope.map.setCenter(ll);

      $scope.map.animateCamera({
        'target': ll,
        'tilt': 60,
        'zoom': 18,
        'bearing': 140
      });

    }, function(error){
      console.log("Could not get location");
    });
  };

  $scope.dropMarkerClick = function() {
    var onSuccess = function(location) {
      var msg = ["Current your location:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng,
        "speed:" + location.speed,
        "time:" + location.time,
        "bearing:" + location.bearing].join("\n");

      $scope.map.addMarker({
        'position': location.latLng,
        'title': msg
      }, function(marker) {
        marker.showInfoWindow();
      });
    };

    var onError = function(msg) {
      alert("error: " + msg);
    };
    $scope.map.getMyLocation(onSuccess, onError);
  };

});
