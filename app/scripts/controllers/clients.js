'use strict';

Hugo.controller('ClientsCtrl', ['$scope', '$http', 'ClientService', function ($scope, $http, ClientService) {
    var clientsPromise = ClientService.getAll();
    clientsPromise.then(function(data) {
        $scope.clients = data;
    });
}]);
