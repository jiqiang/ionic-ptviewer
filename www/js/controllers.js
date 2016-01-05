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
      template: 'Loading...'
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

}])

.controller('LinesByModeCtrl', ['$scope', 'ptvtt', function ($scope, ptvtt) {
  $scope.lineModes = ptvtt.lineModes();
}])

.controller('LinesByModeModesCtrl', ['$scope', function ($scope) {

}])

.controller('LinesByModeLinesCtrl', ['$scope', '$stateParams', '$ionicLoading', 'ptvtt', function ($scope, $stateParams, $ionicLoading, ptvtt) {
  $scope.loadLines = function () {
    $ionicLoading.show({
      template: 'Loading...'
    });

    ptvtt.lines($stateParams.lineMode).then(function (response) {
      $scope.lines = response.data;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.loadLines();

}])

.controller('LinesByModeStopsCtrl', ['$scope', '$stateParams', '$ionicLoading', 'ptvtt', function ($scope, $stateParams, $ionicLoading, ptvtt) {
  $scope.loadStops = function () {
    $ionicLoading.show({
      template: 'Loading...'
    });

    ptvtt.lineStops($stateParams.lineMode, $stateParams.lineId).then(function (response) {

      $scope.stops = response.data;
      console.log($scope.stops);
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.loadStops();

}]);
