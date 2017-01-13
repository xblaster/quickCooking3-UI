'use strict';

angular.module('quickCooking3UiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/book/:name', {
        templateUrl: 'app/book/book.html',
        controller: 'BookCtrl'
      });
  });
