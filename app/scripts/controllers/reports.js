'use strict';

Hugo.controller('ListReportCtrl', ['$scope', 'ReportService', function ($scope, ReportService) {
    var reportPromise = ReportService.getAll();
    reportPromise.then(function(data) {
        $scope.reports = data;
    });
}]);
