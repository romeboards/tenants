'use strict';

angular.module('mean.system').controller('NavCtrl', ['$rootScope','$scope', function ($rootScope, $scope) {

  $scope.streetNumber = '1045';
  $scope.streetName = 'Union Street';


		$scope.isActiveTab = function(tab) {
			return tab == $rootScope.state;
		}


		$scope.searchReqs = function() {

			$rootScope.addr = $scope.streetNumber + ' ' + $scope.streetName;
			$rootScope.addr = $rootScope.addr.toUpperCase();
			$rootScope.streetName = $scope.streetName;
			$rootScope.streetNumber = $scope.streetNumber;
		};

}]);
