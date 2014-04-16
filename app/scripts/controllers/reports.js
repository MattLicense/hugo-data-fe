'use strict';

Hugo.controller('ListReportCtrl', ['$scope', '$cookieStore', '$http', '$routeParams', 'ReportService', function ($scope, $cookieStore, $http, $routeParams, ReportService) {
    var reportPromise = ReportService.getAll();
    reportPromise.then(function(data) {
        $scope.reports = data;
    });
}]);
