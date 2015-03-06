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

      // just starting with brooklyn
  		Address.getHPDViolations('3', $rootScope.block, $rootScope.lot, function(data, error) {

			  if(error) {
			    console.error(error);
			  } else {

          console.log('violations ',data);
			    $scope.hpdviolations = data;
			  } 
  		});

      // just starting with brooklyn
      Address.getHPDComplaints('3', $rootScope.block, $rootScope.lot, function(data, error) {

        if(error) {
          console.error(error);
        } else {

          console.log('complaints',data);
          $scope.hpdcomplaints = data;
        } 
      });

  	}
  });		

}]);
