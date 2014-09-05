(function () {
    'use strict';

    var controllerId = 'musicCollectionController';

    angular.module('app')
        .controller(controllerId, ['musicCollectionService', '$window', '$scope', musicCollectionController]);

    function musicCollectionController(musicCollectionService, $window, $scope) {
        var vm = this;
        vm.title = 'Music Collection';
        vm.getCollection = getCollection;
        vm.collection = null;
        vm.filteredCollection = null;
        vm.collectionYears = null;
        vm.activate = activate;
        vm.redirectViaJSONLink = redirectViaJSONLink;

        activate();

        function activate() {
            return getCollection();
        }

        function getCollection() {
            return musicCollectionService.getAll().then(function (data) {
                vm.collection = data.releases;
                vm.filteredCollection = vm.collection;

                $scope.$watch('vm.collection | filter:musicCollectionFilter', function (newVal) {
                    vm.filteredCollection = newVal;                   
                }, true);

                $scope.$watch('vm.collection | filter:musicCollectionFilter', function (newVal) {
                    vm.collectionYears = getYearsFromCollection(newVal);
                }, true);

                return vm.collection;
            });
        }

        function redirectViaJSONLink(url) {
            return musicCollectionService.resolveJSONEndpointToHttpUrl(url).then(function (uri) {
                $window.location.href = uri;
            });
        }

        function getYearsFromCollection(collection) {
            var yearCounts = {};
            var years = [];

            angular.forEach(collection, function (element) {
                yearCounts[element.basic_information.year] = (yearCounts[element.basic_information.year] || 0) + 1;
            });

            angular.forEach(yearCounts, function (count, year) {
                years.push({ 'year': year, 'count': count });
            });

            return years;
        }
    }
})();