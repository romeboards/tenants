'use strict';

angular.module('mean.system').controller('RegController', ['$rootScope','$scope', '$http', 'Address', function ($rootScope, $scope, $http, Address) {

	$rootScope.state = 2;

  $scope.$watch(function(){ return $rootScope.addr }, function(val) {	

  	if($rootScope.addr && $rootScope.addr.length) {

  		Address.getTaxInfo($scope.addr, function(data,error) {

  			  if(error) {
  			    console.error(error);
  			  } else {
  			  	console.log(data[0]);
  			    $scope.taxinfo = data[0];
  			  } 
  		});

  	}
  });		

}]);
