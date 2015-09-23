'use strict';

angular.module('quickCooking3UiApp')
    .service('recipes', function($http) {
        function search(text) {
            return $http.get('/api/searchs', {params: { text: text}});
        }

        return {
            search: search
        }
    });