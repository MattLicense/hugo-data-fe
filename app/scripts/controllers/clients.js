'use strict';

Hugo.controller('ClientsCtrl', ['$scope', 'ClientService', 'Auth', function ($scope, ClientService, Auth) {
    var clientsPromise = ClientService.getAll();
    clientsPromise.then(function(data) {
        $scope.clients = data;
    });

    Auth.checkLogin();
}]);
