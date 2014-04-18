'use strict';

Hugo.controller('ClientsCtrl', ['$scope', 'ClientService', function ($scope, ClientService) {
    var clientsPromise = ClientService.getAll();
    clientsPromise.then(function(data) {
        $scope.clients = data;
    });
}]);
