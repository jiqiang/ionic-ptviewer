angular.module("ptviewer.controllers", ['ptviewer.services'])

.controller('AppCtrl', ['$scope', function ($scope) {
  $scope.platform = ionic.Platform.platform();
}])

.controller('WarningCtrl', ['$scope', function ($scope) {

}])

.controller('HomeCtrl', ['$scope', function ($scope) {

}])

.controller('DisruptionsCtrl', ['$scope', 'ptvtt', function ($scope, ptvtt) {
  $scope.disruptionModes = ptvtt.disruptionModes();
}])

.controller('DisruptionsDetailCtrl', ['$scope', function ($scope) {

}]);
