'use strict';

angular.module('quickCooking3UiApp')
  .controller('MainCtrl', function ($scope, $http, recipes, $routeParams, $location) {

    $scope.search = function(queryString) {
    	console.log("search "+queryString)
		$location.search("queryString="+queryString) ;
    }

    console.log($routeParams);

    if ($routeParams.queryString) {
    	$scope.searchString = $routeParams.queryString;
		recipes.search($routeParams.queryString).success(function(result) {
    		$scope.recipes = result;
    	});
    }


    

  });
