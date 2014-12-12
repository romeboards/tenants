'use strict';

/**
 * @ngdoc service
 * @name angtestApp.newService
 * @description
 * # newService
 * Service in the angtestApp.
 */

angular.module('mean')
	.factory('Address', ['$http', function Address($http) {

		var ext_api_threeoneone = 'http://data.cityofnewyork.us/resource/anu9-nf8x.json';			//311 Brooklyn requests
		var ext_api_codeviolations = 'http://data.cityofnewyork.us/resource/wvxf-dwi5.json';
		var int_api_taxinfo = 'blding/taxes/';
		var boards = 'data/boards.json';

		return {
			getThreeOneOne: function(addr, callback) {
				$http.get(ext_api_threeoneone, { params: { incident_address: addr }})
					.success(function(data, status, headers, config) {
						callback(data, null);
					})
					.error(function (e) {
						callback(null, e);
					});
			},
			getCommunityBoard: function(board, callback) {
				$http.get(boards)
					.success(function(data, status, headers, config) {
						callback(data[0][board], null);
					})
					.error(function (e) {
						callback(null, e);
					});				
			},
			getCodeViolations: function(streetNumber, streetName, callback) {
				$http.get(ext_api_codeviolations, { params: { housenumber: streetNumber, streetname: streetName }})
					.success(function(data, status, headers, config) {
						callback(data, null);
					})
					.error(function (e) {
						callback(null, e);
					});
			},
			getTaxInfo: function(addr, callback) {

				$http.get(int_api_taxinfo + addr)
					.success(function(data, status, headers, config) {
						callback(data, null);
					})
					.error(function (e) {
						console.log(e);
						callback(null, e);
					});
			}
		};

               

}]);
