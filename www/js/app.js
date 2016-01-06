// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ptviewer', ['ionic', 'ptviewer.services', 'ptviewer.controllers'])

.run(function($ionicPlatform, $ionicPopup, ptvtt) {
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
        $ionicPopup.alert({
          title: '',
          template: 'Server returns errors.'
        });
      }

    }, function (error) {
      $ionicPopup.alert({
        title: 'Network Error',
        template: 'No internet connection.'
      });
    });
    */
  });
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('error', {
      url: "/error",
      templateUrl: 'templates/error.html'
    })
    .state('warning', {
      url: "/warning",
      templateUrl: 'templates/warning.html',
      controller: 'WarningCtrl'
    })
    .state('disruptions', {
      abstract: true,
      url: "/disruptions",
      templateUrl: "templates/disruptions.html",
      controller: 'DisruptionsCtrl'
    })
    .state('disruptions.modes', {
      url: "/modes",
      templateUrl: "templates/disruptions.modes.html",
      controller: 'DisruptionsModesCtrl'
    })
    .state('disruptions.detail', {
      url: "/detail",
      templateUrl: 'templates/disruptions.detail.html',
      controller: 'DisruptionsDetailCtrl'
    })
    .state('linesByMode', {
      abstract: true,
      url: "/linesByMode",
      template: '<ion-nav-view></ion-nav-view>',
      controller: 'LinesByModeCtrl'
    })
    .state('linesByMode.modes', {
      url: "/modes",
      templateUrl: 'templates/linesByMode.modes.html',
      controller: 'LinesByModeModesCtrl'
    })
    .state('linesByMode.lines', {
      url: "/lines/:lineMode",
      templateUrl: 'templates/linesByMode.lines.html',
      controller: 'LinesByModeLinesCtrl'
    })
    .state('linesByMode.stops', {
      url: "/stops/:lineMode/:lineId",
      templateUrl: 'templates/linesByMode.map.html',
      controller: 'LinesByModeStopsCtrl'
    });

  $urlRouterProvider.otherwise('home');
});
