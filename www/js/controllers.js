angular.module("ptviewer.controllers", ['ionic', 'ptviewer.services'])

.controller('AppCtrl', ['$scope', function ($scope) {
  $scope.platform = ionic.Platform.platform();
}])

.controller('WarningCtrl', ['$scope', function ($scope) {

}])

.controller('HomeCtrl', ['$scope', function ($scope) {

}])

// Disruptions
.controller('DisruptionsCtrl', ['$scope', 'ptvtt', function ($scope, ptvtt) {
  $scope.disruptionModes = ptvtt.disruptionModes();
}])

.controller('DisruptionsDetailCtrl', ['$scope', '$ionicLoading', 'ptvtt', function ($scope, $ionicLoading, ptvtt) {

  $scope.loadDisruptions =  function () {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>',
      noBackdrop: false
    });

    var modes = [];
    angular.forEach($scope.disruptionModes, function (mode, idx) {
      if (mode.checked) {
        this.push(mode.key);
      }
    }, modes);

    ptvtt.disruptions(modes).then(function (response) {
      $scope.disruptions = response.data;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });

  }

  $scope.loadDisruptions();

}])

.controller('DisruptionsModesCtrl', ['$scope', function ($scope) {
  $scope.showButton = true;

  $scope.onClickMode = function () {
    var modes = [];
    angular.forEach($scope.disruptionModes, function (mode, idx) {
      if (mode.checked) {
        this.push(mode.key);
      }
    }, modes);
    $scope.showButton =  modes.length > 0 ? true : false;
  }

}]);
