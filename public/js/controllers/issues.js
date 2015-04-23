'use strict';

angular.module('mean.system').controller('IssuesController', ['$rootScope','$scope', '$http', 'Address', function ($rootScope, $scope, $http, Address) {

  $rootScope.state = 1;

  $scope.sortByDate = function(itm) {
      var date = new Date(itm.recent);
      return date;
  };

  var complaintRequestUrl = 'https://www1.nyc.gov/nyc311-hpd-service-request/form.htm?locationType=Apartment&topic=Apartment%20Only';

  var complaintRequestTypes = {
    serious: '',
    general: '',
    electric: '',
    heating: 'Heat/Hot%20Water',
    misc: ''    
  };

  $scope.issues = {
    serious: [],
    general: [],
    electric: [],
    heating: [],
    misc: []
  };

  $scope.getComplaintRequest = function(type) {
    return complaintRequestUrl + '&complaintType=' + complaintRequestTypes[type];
  }


  $scope.$watch(function(){ return $rootScope.addr }, function(val) {	

  	if($rootScope.addr && $rootScope.addr.length) {

  		Address.getThreeOneOne($scope.addr, function(data, error) {
  			if(error) console.error(error);
        else {
          console.log('311', data);
          collateThreeOneOne(data);
          //$scope.requests = data;
        }
  		}); //end getThreeOneOne

      // just starting with brooklyn
  		Address.getHPDViolations('3', $rootScope.block, $rootScope.lot, function(data, error) {
			  if(error) console.error(error);
			  else {
          console.log('violations ', data);
			    $scope.hpdviolations = data;
			  } 
  		});
      // just starting with brooklyn
      Address.getHPDComplaints('3', $rootScope.block, $rootScope.lot, function(data, error) {
        if(error) console.error(error); 
        else {
          console.log('complaints', data);
          collateHpdComplaints(data);
          //$scope.hpdcomplaints = data;
        } 
      });
  	}    
  });	

  var collateThreeOneOne = function(threeoneone) {

    threeoneone.forEach(function (itm) {

        var toBe = {
          _type : "311request",
          dept : "311",
          level : "Service Request",
          type : itm.complaint_type,
          agency : itm.agency,
          status : itm.status,
          created_date : itm.created_date,
          closed_date : itm.closed_date,
          recent :  itm.closed_date ? itm.closed_date : itm.created_date,
          desc : itm.descriptor
        };

        switch(toBe.type) {
          case 'GENERAL': case 'GENERAL CONSTRUCTION': case 'General Construction/Plumbing':
            $scope.issues.general.push(toBe);
            break;
          case 'ELECTRIC': case 'Electrical':
            $scope.issues.electric.push(toBe);
            break;
          case 'HEAT/HOT WATER': case 'HEATING':
            $scope.issues.heating.push(toBe);
            break;            
          default:
            $scope.issues.misc.push(toBe);
            break; 
        };

        if(toBe.status === "Open") $scope.issues.serious.push(toBe);

    });
  };

  var collateHpdComplaints = function(hpdcomplaints) {

    hpdcomplaints.forEach(function (itm) {

        var toBe = {
          _type : "hpdcomplaint",
          dept : "HPD",
          level : "Complaint",
          type : itm.complaint.MajorCategory,
          agency : "HPD",
          status : itm.Status,
          created_date : itm.ReceivedDate,
          closed_date : itm.StatusDate,
          recent :  itm.StatusDate,
          desc : itm.complaint.Code + ": " + itm.complaint.StatusDescription,
          severity : itm.complaint.Type
        };

        switch(toBe.type) {
          case 'GENERAL': case 'CONSTRUCTION':
            $scope.issues.general.push(toBe);
            break;
          case 'ELECTRIC':
            $scope.issues.electric.push(toBe);
            break;
          case 'HEAT/HOT WATER': case 'HEATING':
            $scope.issues.heating.push(toBe);
            break;            
          default:
            $scope.issues.misc.push(toBe);
            break; 
        };

        if(toBe.status === "OPEN" && (
           toBe.severity === "EMERGENCY" ||
           toBe.severity === "IMMEDIATE EMERGENCY" ||
           toBe.severity === "HAZARDOUS")) $scope.issues.serious.push(toBe);

    });
  };


}]);
