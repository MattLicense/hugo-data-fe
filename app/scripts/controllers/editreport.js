'use strict';

Hugo.controller('EditReportCtrl', ['$scope', '$cookieStore', '$http', '$location', '$routeParams', 'ReportService', 'ClientService', 'API', function ($scope, $cookieStore, $http, $location, $routeParams, ReportService, ClientService, API) {
    var clientsPromise = ClientService.getAll();
    clientsPromise.then(function(data) {
        $scope.clients = data;
    });
    var reportPromise = ReportService.get($routeParams.reportId);
    reportPromise.then(function(data) {
        $scope.report = data;
        if(typeof($scope.report.report_order) == 'undefined'  || $scope.report.report_order == null) {
            var order = [ { column: '', type: '' } ];
        } else {
            var order = angular.fromJson($scope.report.report_order);
        }
        $scope.order = order;
        $scope.published = $scope.report.published == 1;
        $scope.client = $scope.report.client_id;
        $scope.columns = $scope.report.report_data.columns;
        $scope.columns.splice($scope.columns.indexOf('year'),1);
        $scope.columns.splice($scope.columns.indexOf('local_authority'),1);
    });

    $scope.addGraph = function() {
        $scope.order.push({ column: '', type: '' });
    };

    $scope.save = function() {
        $http({
            url: API + '/report/' + $routeParams.reportId,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: {
                report_about: $scope.about,
                report_order: $scope.order,
                published: $scope.published,
                client_id: $scope.client
            }
        }).success(function(data) {
            $location.path('report/' + $routeParams.reportId);
        });
    };

    $scope.types = [
        'AreaChart',
        'BarChart',
        'ColumnChart',
        'LineChart',
        'Table'
    ];
}]);
