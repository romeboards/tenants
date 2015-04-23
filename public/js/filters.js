'use strict';

angular.module('mean')
  .filter('titleCase', function () {
    return function (input) {
      if(!input) return;

      var spaces = input.split(' ');
      for (var i = 0; i < spaces.length; i++) {
        spaces[i] = spaces[i].toLowerCase();
        spaces[i] = spaces[i].charAt(0).toUpperCase() + spaces[i].slice(1);
      }
      return spaces.join(' ');
    }
  });
