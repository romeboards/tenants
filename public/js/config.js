'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'IndexController',
        templateUrl: 'views/index.html'
      })
      .state('issues', {
        url: '/issues',
        controller: 'IssuesController',
        templateUrl: 'views/issues.html'
      })
      .state('registrations', {
        url: '/registrations',
        controller: 'RegController',
        templateUrl: 'views/registrations.html'
      });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
