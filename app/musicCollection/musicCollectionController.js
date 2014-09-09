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
        vm.searchText = null;
        vm.searchOptions = getSearchOptions();
        vm.searchBy = vm.searchOptions[0];

        vm.activate = activate;
        vm.redirectViaJSONLink = redirectViaJSONLink;

        activate();

        function activate() {
            loadCollection();

            $scope.$watch("vm.searchBy", function () {
                vm.searchText = "";
            });
        }

        function loadCollection() {
            musicCollectionService.getAll().then(function (data) {
                vm.collection = data.releases;
                vm.filteredCollection = vm.collection;
            });

            $scope.$watchCollection('vm.collection | textFilter:vm.searchText:vm.searchBy', function (newVal) {
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

        function getSearchOptions() {
            return [{
                label: 'Name',
                value: 'name'
            }, {
                label: 'Title',
                value: 'title'
            }, {
                label: 'Year',
                value: 'year'
            }, {
                label: 'Format',
                value: 'format'
            }];
        }
    }
})();