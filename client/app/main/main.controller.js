'use strict';

angular.module('quickCooking3UiApp')
  .controller('MainCtrl', function ($scope, $http, recipes) {
    $scope.awesomeThings = [];

    recipes.search().success(function(result) {
    	$scope.recipes = result;
    });

  });
