(function () {
    'use strict';
    
    var filtersModule = angular.module('app.mc.filters', []);

    filtersModule.filter('textFilter', textFilter);
    textFilter.$inject = [];

    /*
     * Filter for comparing name of artist in a collection of releases to given text value
     */
    function textFilter($filter) {
        return function (items, text, searchBy) {
            if (!text || text === '' || !searchBy || searchBy === '') return items;

            var filteredItems = [];
            var propertyPath = null;
            text = text.toLowerCase();

            switch (searchBy.value) {
                case "name":
                    propertyPath = "basic_information.artists.0.name";
                    break;
                case "title":
                    propertyPath = "basic_information.title";
                    break;
                case "year":
                    propertyPath = "basic_information.year";
                    break;
                case "format":
                    propertyPath = "basic_information.formats.0.name";
                    break;
            }

            angular.forEach(items, function (item) {
                var value = getProperty(item, propertyPath).toString().toLowerCase();
                if (value.indexOf(text) > -1) filteredItems.push(item);
            });

            return filteredItems;
        };

        /*
         * This function parses a string as a path to a property of a nested json object
         */
        function getProperty(obj, prop) {
            var parts = prop.split('.'),
                last = parts.pop(),
                l = parts.length,
                i = 1,
                current = parts[0];

            while ((obj = obj[current]) && i < l) {
                current = parts[i];
                i++;
            }

            if (obj) {
                return obj[last];
            }
        }
    }
}());