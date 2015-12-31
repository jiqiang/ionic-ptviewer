angular.module("ptviewer.controllers", [])

.controller('AppCtrl', ['$scope', function ($scope) {
  $scope.platform = ionic.Platform.platform();
}]);
