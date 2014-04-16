'use strict';

Hugo.controller('ClientCtrl', ['$scope', '$q', '$routeParams', 'ClientService', function ($scope, $q, $routeParams, ClientService) {
    var clientPromise = ClientService.get($routeParams.clientId);
    clientPromise.then(function(data) {
        $scope.client = data;
    });
}]);
