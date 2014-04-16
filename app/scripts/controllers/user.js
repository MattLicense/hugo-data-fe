'use strict';

Hugo.controller('UserCtrl', ['$scope', '$q', '$routeParams', 'UserService', function($scope, $q, $routeParams, UserService) {
    var userPromise = UserService.get($routeParams.userId);
    userPromise.then(function(data) {
        $scope.user = data;
    });
}]);
