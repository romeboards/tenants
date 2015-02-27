'use strict';

angular.module('mean.system').controller('IndexController', ['$rootScope','$scope', '$http', 'Address', function ($rootScope, $scope, $http, Address) {

  $rootScope.state = 0;
  $scope.streetNumber = '1045';
  $scope.streetName = 'Union Street';
  $rootScope.addr = $scope.streetNumber + ' ' + $scope.streetName;
  $rootScope.addr = $rootScope.addr.toUpperCase();
  $rootScope.streetName = $scope.streetName;
  $rootScope.streetNumber = $scope.streetNumber;


  $scope.$watch(function(){ return $rootScope.addr }, function(val) {	

  	if($rootScope.addr && $rootScope.addr.length) {

      Address.getGeosupport($scope.streetNumber, $scope.streetName, function (data, error) {

        if(error) console.log(error);
        else {
          //console.log('geosupport', data);

          $scope.geosupport = data;
          $scope.communityBoard = data.communityDistrictNumber;

          Address.getCommunityBoard($scope.communityBoard, function(data, error) {
            if(error) console.error(error);
            $scope.communityBoardInfo = data;
          });
        }

      }); //end getGeosupport

      Address.getRentStabilization($scope.streetNumber, $scope.streetName, function (data, error) {

        if(error) console.log(error);
        else if (data[0]) { 
          $scope.rentstabilization = data[0];

          if($scope.rentstabilization.STATUS1.length) {
            Address.getDHCRGlossary($scope.rentstabilization.STATUS1, function(data, error) {
              if(error) console.error(error);
              $scope.rentstabilization.STATUS1INFO = data;
            });              
          }
          if($scope.rentstabilization.STATUS2.length) {
            Address.getDHCRGlossary($scope.rentstabilization.STATUS2, function(data, error) {
              if(error) console.error(error);
              $scope.rentstabilization.STATUS2INFO = data;
            });    
          }
          if($scope.rentstabilization.STATUS3.length) {
            Address.getDHCRGlossary($scope.rentstabilization.STATUS3, function(data, error) {
              if(error) console.error(error);
              $scope.rentstabilization.STATUS3INFO = data;
            });    
          }     
        }
      });

  	}
  });		

}]);
