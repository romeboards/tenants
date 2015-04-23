'use strict';

angular.module('mean')
	.directive('navbar', function () {
	    return {
	      scope: {},
	      templateUrl: 'partials/navbar.html',
	      controller: 'NavCtrl',
	      link: function postLink(scope, element) {
	      }
    	};
 	});