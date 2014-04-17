'use strict';

Hugo.controller('NewReportCtrl', ['$scope', '$cookieStore', '$location', '$upload', 'ReportService', 'ClientService', 'API', function ($scope, $cookieStore, $location, $upload, ReportService, ClientService, API) {
    var clientsPromise = ClientService.getAll();
    clientsPromise.then(function(data) {
        $scope.clients = data;
    });
    $scope.report = {};
    $scope.error = '';

    $scope.setFile = function($files) {
        $scope.csv = $files[0];
    }

    $scope.save = function() {
        $scope.uploadFile = $upload.upload({
            url: API + '/report/',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: {
                id: $scope.report.id,
                client_id: $scope.client,
                report_about: $scope.about
            },
            file: $scope.csv,
            fileFormDataName: 'csv'
        }).success(function(response) { // success callback
            if(response.code == 200) {
                $location.path('admin/report/' + $scope.report.id);
            } else {
                $scope.error = response.error;
            }
        });
    }
}]);
