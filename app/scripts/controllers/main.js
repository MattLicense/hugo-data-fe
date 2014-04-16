'use strict';

Hugo.controller('MainCtrl', ['$scope', 'ReportService', function ($scope, ReportService) {
    var reportPromise = ReportService.getAll();
    reportPromise.then(function(data) {
        $scope.reports = data;
    });
}]);
