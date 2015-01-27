'use strict';

angular.module('mean.system').controller('RegController', ['$rootScope','$scope', '$http', '$timeout', 'Address', function ($rootScope, $scope, $http, $timeout, Address) {

  $rootScope.state = 2;

  $scope.$watch(function(){ return $rootScope.addr }, function(val) {	

    if($rootScope.addr && $rootScope.addr.length) {

      Address.getTaxInfo($scope.addr, function(data,error) {
        if(error) console.error(error);
        else $scope.taxinfo = data[0]; 
      });

      Address.getBuildingOwners($scope.addr, function(owners) {
        $scope.otherBuildings = [];
        $scope.owners = owners;
      });

    }
  });

  $scope.selectOwner = function(owner) { $scope.selectedOwner = owner; };

}]);
