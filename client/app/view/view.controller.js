/*globals angular */
'use strict';

angular.module('quickCooking3UiApp')
  .controller('ViewCtrl', function ($scope, $routeParams) {
  	
    $scope.getStyleFor = function() {
    	var style= {
    		  //'background': 'url(/api/searchs/images/'+recipe._source.checksum+'?quality=l) no-repeat center fixed',
              'background': 'white url(/api/searchs/images/'+$scope.checksum+'?quality=l) no-repeat center',    //
              'background-repeat':'no-repeat',
              'background-position': 'top',
              'background-size': 'contain',
              'height': window.innerHeight+"px"
  			  
    	};

    	return style;
    }

    $scope.getBigDetailsFor = function() {
    	var style= $scope.getStyleFor();
        style['background'] = 'url(/api/searchs/images/'+$scope.checksum+') no-repeat center';

    	return style;
    }
    
    $scope.visible = true;
  	
    $scope.checksum = $routeParams.checksum;
  });
