// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova', 'app.controllers'])

.run(function($ionicPlatform, $rootScope, $ionicHistory, $ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.isMenuOpen = false;

  $rootScope.side_menu = document.getElementsByTagName("ion-side-menu")[0];

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromParams, toParams) {
     if (toState.name != 'native') {
         $rootScope.side_menu.style.visibility = "visible";
     }
  });

  if ($rootScope.isMenuOpen == true) {
    $rootScope.side_menu.style.opacity = 0;
  } else if ($rootScope.isMenuOpen == false) {
    $rootScope.side_menu.style.opacity = 1;
  }

  $rootScope.closeMenu = function() {
    console.log("Closing Menu");
    $ionicHistory.nextViewOptions({
        disableAnimate: true
    });
    $ionicSideMenuDelegate.toggleRight();
    $rootScope.isMenuOpen = false;
    $rootScope.side_menu.style.opacity = 0;
  }

  $rootScope.toggleMenu = function() {
    console.log("Toggling Menu");
    $ionicSideMenuDelegate.toggleRight();
    if ($rootScope.isMenuOpen == true) {
      console.log("closed");
      $rootScope.isMenuOpen = false;
      $rootScope.side_menu.style.opacity = 0;
    } else if($rootScope.isMenuOpen == false)  {
      console.log("open");
      $rootScope.isMenuOpen = true;
      $rootScope.side_menu.style.opacity = 1;
    }
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    controller: 'AppCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/nonNative');
});
