'use strict';

Hugo.controller('UserCtrl', ['$scope', '$q', '$routeParams', 'UserService', 'Auth', function($scope, $q, $routeParams, UserService, Auth) {
    Auth.checkLogin();

    var userPromise = UserService.get($routeParams.userId);
    userPromise.then(function(data) {
        $scope.user = data;
    });
}]);
