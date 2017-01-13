'use strict';

angular.module('quickCooking3UiApp')
  .controller('BookCtrl', function ($scope, $routeParams, recipes, $location) {
    $scope.message = 'Hello';
    $scope.bookName = $routeParams.name;

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


 	if ($routeParams.name) {
        $scope.loading = true;
    	$scope.searchString = $routeParams.name;
		var res = recipes.book($routeParams.name);

        //console.log(res)
        res.then(function(result) {
            console.log(result);
            $scope.loading = false;
    		$scope.recipes = result.data;
    	});
    }

  });
