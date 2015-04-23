'use strict';

angular.module('mean')
  .directive('streetView', ['Address', function (Address) {
    return {
      scope: false,
      template: '<div id="map-canvas"></div><div id="pano"></div>',
      link: function (scope, element, attrs) {

        function initialize(lat, lng) {

          var blding = new google.maps.LatLng(lat, lng)
          var mapOptions = {
            center: blding,
            zoom: 14
          };
          var map = new google.maps.Map(
              document.getElementById('map-canvas'), mapOptions);
          var panoramaOptions = {
            position: blding//,
           // pov: {
             // heading: 34,
             // pitch: 10
            //}
          };
          var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
          map.setStreetView(panorama);
        }

        //google.maps.event.addDomListener(window, 'load', initialize);



        // var geocoder = new google.maps.Geocoder();
        // var bounds = new google.maps.LatLngBounds();
        // var infoWindow = new google.maps.InfoWindow();
        // var circle = {
        //   path: google.maps.SymbolPath.CIRCLE,
        //   fillColor: 'red',
        //   fillOpacity: .8,
        //   scale: 4.5,
        //   strokeColor: 'white',
        //   strokeWeight: 1
        // };
        // var mapOptions = {
        //   zoom: 12,
        //   center: new google.maps.LatLng(40.714352, -74.005973),
        //   mapTypeId: google.maps.MapTypeId.TERRAIN
        // }

        // var map = new google.maps.Map(element.find('.map')[0], mapOptions);

        // var addMarkerToMap = function(registration) {

        //   var address = registration.housenumber + ' ' + registration.streetname + ' ' + registration.zip;

        //   Address.getLatLng(address, function(latlng) {

        //     if(latlng.length) {
        //       var lat = latlng[0].latitude,
        //           lng = latlng[0].longitude,
        //           pos = new google.maps.LatLng(lat, lng);

        //       map.setCenter(pos);                     

        //       var marker = new google.maps.Marker({
        //           map: map,
        //           icon: circle,
        //           position: pos,
        //       });

        //       marker.content = '<div class="infoWindowContent">' + address + '</div>';
              
        //       google.maps.event.addListener(marker, 'click', function(){
        //           infoWindow.setContent(address);
        //           infoWindow.open(map, marker);
        //       });
        //       bounds.extend(marker.position);

        //       map.fitBounds(bounds);        
        //     }
        //   });    
        // };

        scope.$watch(function(){ return scope.geosupport }, function(val) {  

          if(scope.geosupport) {

            initialize(scope.geosupport.latitude, scope.geosupport.longitude);

            //console.log('lat',scope.geosupport.latitude);

            // Address.getBuildingsFromBusinessAddr(scope.owner, function(eachRegistration) {      //callback is called for 'each'
            //   scope.buildings.push(eachRegistration);
            //   addMarkerToMap(eachRegistration);
            // });
          }

        });
      }
    };
  }]);