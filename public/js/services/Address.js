'use strict';

/**
 * @ngdoc service
 * @name angtestApp.newService
 * @description
 * # newService
 * Service in the angtestApp.
 */

angular.module('mean')
.factory('Address', ['$http', '$q', function Address($http, $q) {

    var dob_threeoneone = 'http://data.cityofnewyork.us/resource/anu9-nf8x.json';			//311 Brooklyn requests
    var hpd_codeviolations = 'http://data.cityofnewyork.us/resource/wvxf-dwi5.json';
    var hpd_registrations = 'https://data.cityofnewyork.us/resource/tesw-yqqr.json';
    var hpd_contacts = 'https://data.cityofnewyork.us/resource/feu5-w2e2.json';

    var api_taxinfo = 'api/blding/taxes/';
    var api_dhcr = 'api/blding/dhcr/';
    var api_addr = 'api/blding/addr/';
    var api_geocode = 'api/geocode/';
    var api_geoclient = 'api/geoclient/';
    var api_bbl = 'api/geoclient/bbl/';    
    var boards = 'data/boards.json';
    var dhcr = 'data/dhcr.json';


    /* private functions */
    var request = function(url) {
      var deferred = $q.defer();

      $http.get(url)
      .success(function(data) { deferred.resolve(data); })
      .error(function() { deferred.reject(); });

      return deferred.promise;         
    }

    var getBBLFromAddr = function(number, street) {
      return request(api_bbl + number + '/' + street);  
      // [TODO] this may return more than one item. how best to handle? see: 845 UNION SQUARE  
    }

    // [TODO] this
    // var getAddrFromBBL = function(boro, block, lot) {
    //   return request(api_bbl + boro + '/' + block + '/' + lot);         
    // }

    var getHPDRegistrationID = function(boro, block, lot) {
      return request(hpd_registrations + '?boroid=' + boro + '&block=' + block + '&lot=' + lot);    
    }

    var getRegistrationFromID = function(regID) {
      return request(hpd_registrations + '?registrationid=' + regID);
    }

    /* 
      given: RegistrationID 
      returns: ARRAY with different types of owners

      different types are: "IndividualOwner", "CorporateOwner", "Agent", "HeadOfficer", "Officer", "Shareholder"
      */  
    var getHPDContacts = function(regID) {
      return request(hpd_contacts + '?registrationid=' + regID);
    }

    var getOwnersFromBusinessAddr = function(number,street,zip) {
      return request(hpd_contacts + '?businesshousenumber=' + number + '&businessstreetname=' + street + '&businesszip=' + zip);    
    }

    //using just brooklyn for now
    var getDHCRRentStabilization = function(boro, block, lot) {
      return request(api_dhcr + boro + '/' + block + '/' + lot);    
    }


    /* gets a list of owners, returns an array of unique regids */
    var filterRegIDsFromOwners = function(owners) {
      var regids = [];
      for(var i = 0; i < owners.length; i++) {
        var id = owners[i].registrationid;
        if(regids.indexOf(id) === -1) regids.push(id);
      }
      return regids;
    }



    /* public functions */
    return {
      getLatLng: function(addr, callback) {
        $http.get(api_geocode + addr)
        .success(function(data, status, headers, config) {
          callback(data, null);
        })
        .error(function (e) {
          callback(null, e);
        });            
      },  
      getGeosupport: function(streetNumber, streetName, callback) {
        $http.get(api_geoclient + streetNumber + '/' + streetName)
        .success(function(data, status, headers, config) {
          console.log('geoclient', data);
          callback(data, null);
        })
        .error(function (e) {
          callback(null, e);
        });        
      },
      getThreeOneOne: function(addr, callback) {
        $http.get(dob_threeoneone, { params: { incident_address: addr }})
        .success(function(data, status, headers, config) {
          callback(data, null);
        })
        .error(function (e) {
          callback(null, e);
        });
      },
      // [TODO] just works for brooklyn at the moment
      getCommunityBoard: function(board, callback) {
        $http.get(boards)
        .success(function(data, status, headers, config) {
          callback(data[0][board + ' BROOKLYN'], null);
        })
        .error(function (e) {
          callback(null, e);
        });				
      },
      getDHCRGlossary: function(term, callback) {
        $http.get(dhcr)
        .success(function(data, status, headers, config) {
          callback(data[0][term].info, null);
        })
        .error(function (e) {
          callback(null, e);
        });       
      },      
      getCodeViolations: function(streetNumber, streetName, callback) {
        $http.get(hpd_codeviolations, { params: { housenumber: streetNumber, streetname: streetName }})
        .success(function(data, status, headers, config) {
          callback(data, null);
        })
        .error(function (e) {
          callback(null, e);
        });
      },
      getTaxInfo: function(addr, callback) {
        $http.get(api_taxinfo + addr)
        .success(function(data, status, headers, config) {
          callback(data, null);
        })
        .error(function (e) {
          console.log(e);
          callback(null, e);
        });
      },
      getBuildingOwners: function(streetNumber, streetName, callback) {
        getBBLFromAddr(streetNumber, streetName)
        .then(function (bbl) {
          if(bbl) return getHPDRegistrationID(bbl.boro, bbl.block, bbl.lot);
          else console.log('no bbl');
        })
        .then(function (registration) {
          if(registration) return getHPDContacts(registration[0].registrationid);
          else console.log('no HPD registration');
        })
        .then(function (contacts) {
          if(contacts) callback(contacts);
          else console.log('no registration contacts');
        })
        .catch(function (error) {
          console.log('[dberror]', error.message);
        });
      },
      getBuildingsFromBusinessAddr: function(owner, callback) {           //callback is called for every regid found
        var housenumber = owner.businesshousenumber,
        streetname = owner.businessstreetname,
        zip = owner.businesszip;

        getOwnersFromBusinessAddr(housenumber,streetname,zip)
        .then(function (owners) {

          var regids = filterRegIDsFromOwners(owners);

          regids.forEach(function(regid) {
            getRegistrationFromID(regid).then(function (registration) {
              callback(registration[0]);
            });
          });
        });
      },
      getRentStabilization: function(streetNumber, streetName, callback) {
        getBBLFromAddr(streetNumber, streetName)
        .then(function (bbl) {
          if(bbl) return getDHCRRentStabilization(bbl.boro, bbl.block, bbl.lot);
          else console.log('no bbl');
        })
        .then(function (dhcr) {
          if(dhcr) callback(dhcr);
          else console.log('no dhcr info found');
        })        
        .catch(function (error) {
          console.log('[dberror]', error.message);
        });
      }

    }

}]);
