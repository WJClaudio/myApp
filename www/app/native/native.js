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

.controller('NativeCtrl', function($scope, $state, $rootScope) {
  console.log("Inside NativeCtrl");

  $rootScope.side_menu.style.visibility = "hidden";

  var map;
    document.addEventListener("deviceready", function() {
      var div = document.getElementById("map_canvas");

      // Initialize the map view
      map = plugin.google.maps.Map.getMap(div);

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

});
