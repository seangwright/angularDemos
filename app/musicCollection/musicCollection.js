(function () {
    'use strict';
    
    angular.module('musicCollection', [])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('musicCollection', {
                url: '/musicCollection',
                templateUrl: '/app/musicCollection/musicCollection.html',
                controllerAs: 'vm',
                controller: 'musicCollectionController'
            })
    }]);
})();