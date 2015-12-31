// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ptviewer', ['ionic', 'ptviewer.services', 'ptviewer.controllers', 'ngIOS9UIWebViewPatch'])

.run(function($ionicPlatform, $state, ptvtt) {
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
    /*
    ptvtt.healthCheck().then(function (response) {
      var items = [];
      angular.forEach(response.data, function (value, key) {
        if (!value) {
          this.push(key);
        }
      }, items);

      if (items.length > 0) {
        $state.go('warning');
      }
      else {
        $state.go('home');
      }
    }, function (error) {
      $state.go('error');
    });
    */
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: 'templates/home.html'
    })
    .state('error', {
      url: "/error",
      templateUrl: 'templates/error.html'
    })
    .state('warning', {
      url: "/warning",
      templateUrl: 'templates/warning.html'
    });

  $urlRouterProvider.otherwise('home');
});
