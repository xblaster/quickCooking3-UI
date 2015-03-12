'use strict';
/*jshint esnext: true */
import MainService from './main.service';
class MainCtrl {
    constructor($scope, MainService) {
        //$scope.loadImg
        this.client = elasticsearch.Client({
            host: 'localhost:3000'
        });


        



        //bad but need to investigate ;)

        // $scope.loadImg = (recipe) => {
        //     this.client.search({
        //         index: 'pictures',
        //         q: 'checksum:' + recipe._source.checksum
        //     }, (error, response) => {
        //         if (response.hits.length !== 0) {
        //             $scope.$apply(() => {
        //                 console.log(response.hits[0]);
        //                 recipe.img = response.hits.hits[0]._source.content;
        //             });
        //         }
        //         //recipe.base64Img = 
        //     });
        // }


        $scope.search = (query) => {
            this.client.search({
                index: 'recipes',
                q: 'content:' + query
            }, (error, response) => {
                //console.log(response.hits.hits);
                $scope.$apply(() => {
                    $scope.awesomeThings = response.hits.hits;
                });
            });
        }

        $scope.getStyleForCaption = (caption) => {
            var styles = {
                'background-color': '#eee',
                'background-image':  'url(/pictures?'+caption._source.checksum+')',
                'background-size': "contain"
            };


            console.log(styles);
            return styles;
        };

        $scope.search('a');

    }



}
MainCtrl.$inject = ['$scope', 'MainService'];
export
default MainCtrl;