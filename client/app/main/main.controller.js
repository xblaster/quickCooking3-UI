'use strict';

angular.module('quickCooking3UiApp')
  .controller('MainCtrl', function ($scope, $http, recipes, $routeParams, $location) {

    $scope.search = function(queryString) {
    	console.log("search "+queryString)
		$location.search("queryString="+queryString) ;
    }

    $scope.getStyleFor = function(recipe) {
    	var style= {
    		  //'background': 'url(/api/searchs/images/'+recipe._source.checksum+'?quality=l) no-repeat center fixed',
    		  'background': 'white url(/api/searchs/images/'+recipe._source.checksum+'?quality=p) no-repeat center',
  			  '-webkit-background-size': 'contain',
  				'background-size': 'contain',
  				'min-height': '30em'
    	};

    	return style;
    }

    $scope.getBigDetailsFor = function(recipe) {
    	var style= $scope.getStyleFor(recipe);
    	style['background'] = 'url(/api/searchs/images/'+recipe._source.checksum+'?quality=l) no-repeat center';

    	return style;
    }

    $scope.open = function(recipe) {
    	window.location= '/api/searchs/images/'+recipe._source.checksum
    }

    console.log($routeParams);

    if ($routeParams.queryString) {
    	$scope.searchString = $routeParams.queryString;
		recipes.search($routeParams.queryString).success(function(result) {
    		$scope.recipes = result;
    	});
    }


    

  });
