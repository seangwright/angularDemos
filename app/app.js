(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules
        'ngAnimate',        // animations
        'ngRoute'           // routing
        // Custom modules

        // 3rd Party Modules

    ]);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/',
                {
                    templateUrl: 'app/musicCollection/musicCollection.html',
                    title: 'musicCollection'
                })
            .when('/musicCollection',
                { templateUrl: 'app/musicCollection/musicCollection.html', title: 'musicCollection' })
            .when('/submissionForm',
                { templateUrl: 'app/submissionForm/submissionForm.html', title: 'submissionForm' })
            .otherwise({ redirectTo: '/' });
    }]);

    // Execute bootstrapping code and any dependencies.
    // TODO: inject services as needed.
    app.run([function () {

    }]);
})();