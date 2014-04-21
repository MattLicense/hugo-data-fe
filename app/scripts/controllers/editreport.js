'use strict';

Hugo.controller('EditReportCtrl', ['$scope', '$cookieStore', '$http', '$location', '$routeParams', 'ReportService', 'ClientService', 'Auth', 'API', function ($scope, $cookieStore, $http, $location, $routeParams, ReportService, ClientService, Auth, API) {
    Auth.checkLogin();

    $scope.error = '';

    ReportService.get($routeParams.reportId).then(function(data) {
        $scope.report = data;
        if(typeof($scope.report.report_order) == 'undefined'  || $scope.report.report_order == null) {
            var order = [ { column: '', type: '' } ];
        } else {
            var order = angular.fromJson($scope.report.report_order);
        }
        $scope.order = order;
        $scope.published = $scope.report.published == 1;
        $scope.client = $scope.report.client.id;
        $scope.columns = $scope.report.report_data.columns;
        $scope.columns.splice($scope.columns.indexOf('year'),1);
        $scope.columns.splice($scope.columns.indexOf('local_authority'),1);
    });

    ClientService.getAll().then(function(data) {
        $scope.clients = data;
    });

    $scope.addGraph = function() {
        $scope.order.push({ column: '', type: '' });
    };

    $scope.save = function() {
        $("#submit").attr('disabled','disabled');
        $http({
            url: API + '/report/' + $routeParams.reportId,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: {
                report_about: $scope.about,
                report_order: $scope.order,
                published: $scope.published == true,
                client_id: $scope.client
            }
        }).success(function(data, status) {
            if(status == 200) {
                if($scope.published == true) {
                    $location.path('report/' + $routeParams.reportId);
                } else {
                    $location.path('admin/report');
                }
            } else {
                $scope.error = data.error;
                $("#submit").removeAttr('disabled');
            }
        }).error(function(data) {
            $scope.error = data.error;
            $("#submit").removeAttr('disabled');
        });
    };

    $scope.delete = function() {
        $("#submit").attr('disabled','disabled');
        $("#delete").attr('disabled','disabled');
        $http({
            url: API + '/report/' + $routeParams.reportId,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') }
        }).success(function(data) {
            $location.path('admin/report');
        }).error(function(data) {
            $scope.error = data.error;
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
