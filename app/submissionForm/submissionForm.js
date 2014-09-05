(function () {
    'use strict';

    var controllerId = 'submissionFormController';

    angular.module('app')
        .controller(controllerId, ['musicCollectionService', '$window', '$scope', submissionFormController]);

    function submissionFormController(musicCollectionService, $window, $scope) {
        var vm = this;
        vm.title = 'Music Submission Form';
    }
})();