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
        $scope.otherbuildings = [];
        $scope.owners = owners;
      });

    }
  });

  $scope.findOtherBuildings = function(owner) {
    Address.getBuildingsFromBusinessAddr(owner, function(registration) {

      $scope.otherbuildings.push(registration);
      addMarkerToMap(registration);

    });
  };

  var geocoder = new google.maps.Geocoder();
  var bounds = new google.maps.LatLngBounds();
  var infoWindow = new google.maps.InfoWindow();
  var circle ={
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .8,
    scale: 4.5,
    strokeColor: 'white',
    strokeWeight: 1
  };
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(40.714352, -74.005973),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  var markers = 0;

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // $scope.$watch(function(){ return $scope.otherbuildings }, function(val) { 
  //   console.log('trigger');
  //   google.maps.event.trigger($scope.map, 'resize');
  //   $scope.map.setCenter(new google.maps.LatLng(42.3605336, -72.6362989));
  // });

  var addMarkerToMap = function(registration) {

    var address = registration.housenumber + ' ' + registration.streetname + ' ' + registration.zip;

    Address.getLatLng(address, function(latlng) {

      if(latlng.length) {
        var lat = latlng[0].latitude,
            lng = latlng[0].longitude,
            pos = new google.maps.LatLng(lat, lng);

        $scope.map.setCenter(pos);                     

        var marker = new google.maps.Marker({
            map: $scope.map,
            icon: circle,
            position: pos,
        });

        marker.content = '<div class="infoWindowContent">' + address + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(address);
            infoWindow.open($scope.map, marker);
        });
        bounds.extend(marker.position);

        $scope.map.fitBounds(bounds);        
      }
    });    
  };

}]);
