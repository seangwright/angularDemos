(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute',
        // Custom modules
        'app.mc'

        // 3rd Party Modules
    ]);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/',
                {
                    templateUrl: 'app/musicCollection/mc.controllers.main.html',
                    title: 'musicCollection',
                    controller: 'mcController',
                    controllerAs: 'vm'
                })
            .when('/musicCollection',
                {
                    templateUrl: 'app/musicCollection/mc.controllers.main.html',
                    title: 'musicCollection',
                    controller: 'mcController',
                    controllerAs: 'vm'
                })
            .when('/submissionForm',
                {
                    templateUrl: 'app/musicCollection/mc.controllers.main.html',
                    title: 'submissionForm'
                })
            .otherwise({ redirectTo: '/' });
    }]);

    // Execute bootstrapping code and any dependencies.
    // TODO: inject services as needed.
    app.run([function () {

    }]);
}());