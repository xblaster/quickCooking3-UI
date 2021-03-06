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
              'background': 'white url(/api/searchs/images/'+recipe._source.checksum+'?quality=p) no-repeat center',    //
    		  //'background': 'white url(http://lorempixel.com/200/400/)',
              'background-repeat':'no-repeat',
              'background-position': 'top',
              'background-size': 'cover'
  			  
    	};

    	return style;
    }

    $scope.getBigDetailsFor = function(recipe) {
    	var style= $scope.getStyleFor(recipe);
    	//style['background'] = 'url(http://lorempixel.com/200/400/)';
        style['background'] = 'url(/api/searchs/images/'+recipe._source.checksum+'?quality=l) no-repeat center';

    	return style;
    }

    $scope.open = function(recipe) {
    	//window.location= '/api/searchs/images/'+recipe._source.checksum
    	$location.path('/view/'+recipe._source.checksum);
    }

    $scope.goToBook = function(recipe) {
        //window.location= '/api/searchs/images/'+recipe._source.checksum
        $location.path('/book/'+recipe._source.bookName);
    }

    console.log($routeParams);

    if ($routeParams.queryString) {
        $scope.loading = true;
    	$scope.searchString = $routeParams.queryString;
		var res = recipes.search($routeParams.queryString);

        //console.log(res)
        res.then(function(result) {
            console.log(result);
            $scope.loading = false;
    		$scope.recipes = result.data;
    	});
    }


    

  });
