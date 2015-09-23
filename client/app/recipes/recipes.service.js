'use strict';

angular.module('quickCooking3UiApp')
    .service('recipes', function($http) {
        function search() {
            return $http.get('/api/searchs');
        }

        return {
            search: search
        }
    });