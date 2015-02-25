'use strict';

angular.module('mean.system').controller('IssuesController', ['$rootScope','$scope', '$http', 'Address', function ($rootScope, $scope, $http, Address) {

  $rootScope.state = 1;

  $scope.$watch(function(){ return $rootScope.addr }, function(val) {	

  	if($rootScope.addr && $rootScope.addr.length) {

  		Address.getThreeOneOne($scope.addr, function(data, error) {

  			if(error) {
  				console.error(error);
  			} else {
  				$rootScope.requests = data;
  			}
  		}); //end getThreeOneOne

  		Address.getCodeViolations($scope.streetNumber, $scope.streetName, function(data, error) {

			  if(error) {
			    console.error(error);
			  } else {
			    $scope.hpdviolations = data;
			  } 
  		});

  	}
  });		

}]);
