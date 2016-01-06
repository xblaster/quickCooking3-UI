'use strict';

angular.module('quickCooking3UiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view/:checksum', {
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl'
      });
  });
