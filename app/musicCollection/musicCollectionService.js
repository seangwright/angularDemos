(function () {
    'use strict';

    var serviceId = 'musicCollectionService';

    angular.module('app')
        .service(serviceId, ['$http', musicCollectionService]);

    function musicCollectionService($http) {
        var service = {
            getAll: getAll,
            resolveJSONEndpointToHttpUrl: resolveJSONEndpointToHttpUrl
        };

        return service;

        function getAll() {
            return $http({ method: 'GET', url: 'http://api.discogs.com/users/infovision/collection/folders/0/releases?sort=year&per_page=100' })
                .then(
                function (response) {
                    return response.data;
                },
                function (response) {
                    console.log("GetAll failed with a status of " + response.status + " : " + response.statusText);
                });

        }

        // Resolves an API endpoint link to its Http counterpart
        function resolveJSONEndpointToHttpUrl(JSONEndpointUrl) {
            return $http({ method: 'GET', url: JSONEndpointUrl })
                .then(function (response) {
                    return response.data.uri;
                },
                function (response) {
                    console.log("resolveJSONEndpointToHttpUrl failed with a status of " + response.status + " : " + response.statusText);
                });
        }
    }
})();