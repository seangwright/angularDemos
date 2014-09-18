(function () {
    'use strict';

    var serviceModule = angular.module('app.mc.services', []);

    serviceModule.service('mcDataService', mcDataService);
    mcDataService.$inject = ['$http'];

    function mcDataService($http) {
        // Toggle to turn on/off local/remote fetching of data
        var localEnvironment = true;

        var service = {
            getAll: getAll,
            resolveJSONEndpointToHttpUrl: resolveJSONEndpointToHttpUrl
        };

        return service;

        function getAll() {
            if (localEnvironment) {
                return $http({
                    method: 'GET',
                    url: 'app/musicCollection/staticCollection.json',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(
                function (response) {
                    return response.data[0];
                },
                function (response) {
                    console.log("GetAll failed with a status of " + response.status + " : " + response.statusText);
                });
            } else {
                return $http(
                    {
                        method: 'GET',
                        url: 'http://api.discogs.com/users/infovision/collection/folders/0/releases?sort=year&per_page=100'
                    })
                    .then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        console.log("GetAll failed with a status of " + response.status + " : " + response.statusText);
                    });
            }
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
}());