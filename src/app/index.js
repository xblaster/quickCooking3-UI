'use strict';
/*jshint esnext: true */

import MainCtrl from './main/main.controller';
import MainService from './main/main.service';
import NavbarCtrl from '../components/navbar/navbar.controller';

angular.module('quickCookingUi', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  .service('MainService', MainService)
  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
