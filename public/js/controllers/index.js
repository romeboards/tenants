'use strict';

angular.module('mean.system').controller('IndexController', ['$rootScope','$scope', '$http', 'Address', function ($rootScope, $scope, $http, Address) {

  $rootScope.state = 0;

  $scope.$watch(function(){ return $rootScope.addr }, function(val) {	

  	if($rootScope.addr && $rootScope.addr.length) {

  		Address.getThreeOneOne($scope.addr, function(data, error) {

  			if(error) {
  				console.error(error);
  			} else {
  				$rootScope.requests = data;
  				$scope.communityBoard = data[0].community_board;

          console.log($scope.communityBoard);

  				Address.getCommunityBoard($scope.communityBoard, function(data, error) {
  					if(error) console.error(error);

  					$scope.communityBoardInfo = data;
  				});
  			}

  		}); //end getThreeOneOne
  	}
  });		

}]);
