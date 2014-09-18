(function () {
    'use strict';

    var controllersModule = angular.module('app.mc.controllers',
        ['multi-select',
         'app.mc.directives',
         'app.mc.services',
         'app.mc.filters']);

    controllersModule.controller('mcController', mcController);
    mcController.$inject = ['$window', '$scope', 'mcDataService'];

    function mcController($window, $scope, mcDataService) {
        var vm = this;

        vm.title = 'Music Collection';
        vm.collection = null;
        vm.filteredCollection = null;
        vm.collectionYears = null;
        vm.searchText = null;
        vm.searchOptions = getSearchOptions();
        vm.searchBy = vm.searchOptions[0];
        vm.filterOptions = vm

        vm.activate = activate;
        vm.redirectViaJSONLink = redirectViaJSONLink;

        activate();

        function activate() {
            loadCollection();

            $scope.$watch("vm.searchBy", function () {
                vm.searchText = "";
            });

            $scope.$watchCollection('vm.collection | textFilter:vm.searchText:vm.searchBy', function (newVal) {
                vm.filteredCollection = newVal;
                vm.collectionYears = getYearsFromCollection(vm.filteredCollection);
            }, true);
        }

        function loadCollection() {
            mcDataService.getAll().then(function (data) {
                vm.collection = data.releases;
                vm.filteredCollection = vm.collection;
            });
        }

        function redirectViaJSONLink(url) {
            return mcDataService.resolveJSONEndpointToHttpUrl(url).then(function (uri) {
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
}());