(function () {
    'use strict';

    var controllerId = 'musicCollectionController';

    angular.module('app')
        .controller(controllerId, ['musicCollectionService', '$window', '$scope', musicCollectionController]);

    function musicCollectionController(musicCollectionService, $window, $scope) {
        var vm = this;
        vm.title = 'Music Collection';
        vm.getCollection = loadCollection;
        vm.collection = null;
        vm.filteredCollection = null;
        vm.collectionYears = null;
        vm.activate = activate;
        vm.redirectViaJSONLink = redirectViaJSONLink;

        activate();

        function activate() {
            loadCollection();
        }

        function loadCollection() {
            musicCollectionService.getAll().then(function (data) {
                vm.collection = data.releases;
                vm.filteredCollection = vm.collection;
            });

            $scope.$watchCollection('vm.collection | textFilter:searchText', function (newVal) {
                vm.filteredCollection = newVal;
                vm.collectionYears = getYearsFromCollection(vm.filteredCollection);
            }, true);
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

    /*
     * Filter for comparing name of artist in a collection of releases to given text value
     */
    angular.module('app')
        .filter('textFilter', function () {
            return function (items, text) {
                if (!text || text === '') return items;

                var filteredItems = [];
                text = text.toLowerCase();

                angular.forEach(items, function (item) {
                    var name = item.basic_information.artists[0].name.toLowerCase();
                    if (name.indexOf(text) > -1) filteredItems.push(item);
                });

                return filteredItems;
            };
        });
})();