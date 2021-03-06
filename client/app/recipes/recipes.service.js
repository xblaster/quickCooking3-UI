'use strict';

angular.module('quickCooking3UiApp')
    .service('recipes', function($http) {
        function search(text) {
            return $http.get('/api/searchs', {params: { text: text}});
        }

        function book(name) {
            return $http.get('/api/searchs/book', {params: { name: name}});
        }

        return {
            search: search,
            book: book
        }
    });