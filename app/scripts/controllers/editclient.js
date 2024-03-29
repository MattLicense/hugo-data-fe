'use strict';

Hugo.controller('EditClientCtrl', ['$scope', '$cookieStore', '$routeParams', '$http', '$location', 'ClientService', 'Auth', 'API', function ($scope, $cookieStore, $routeParams, $http, $location, ClientService, Auth, API) {
    var clientPromise = ClientService.get($routeParams.clientId);
    clientPromise.then(function(data) {
        $scope.client = data;
    });

    Auth.checkLogin();

    $scope.error = '';
    $scope.type = 'edit';

    $scope.save = function() {
        $("#submit").attr('disabled','disabled');
        $http({
            method: 'PUT',
            url: API + '/client/' + $routeParams.clientId,
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: $scope.client
        }).success(function(data, status){
            if(status == 200) {
                $scope.client = data;
                $scope.error = '';
            } else {
                $scope.error = data.error;
            }
            $("#submit").removeAttr('disabled');
        }).error(function(data) {
            $scope.error = data.error;
            $("#submit").removeAttr('disabled');
        });
    };

    $scope.delete = function() {
        $("#delete").attr('disabled','disabled');
        $http({
            method: 'DELETE',
            url: API + '/client/' + $scope.client.id,
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') }
        }).success(function(data, status){
            if(status == 200) {
                $scope.error = '';
                $location.path('admin/client');
            } else {
                $scope.error = data.error;
            }
        }).error(function(data) {
            $scope.error = data.error;
            $("#delete").removeAttr('disabled');
        });
    };
}]);
