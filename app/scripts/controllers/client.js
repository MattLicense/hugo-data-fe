'use strict';

Hugo.controller('ClientCtrl', ['$scope', '$q', '$routeParams', 'ClientService', 'Auth', function ($scope, $q, $routeParams, ClientService, Auth) {
    Auth.checkLogin();

    var clientPromise = ClientService.get($routeParams.clientId);
    clientPromise.then(function(data) {
        $scope.client = data;
    });
}]);
