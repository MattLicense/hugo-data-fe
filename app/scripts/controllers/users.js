'use strict';

Hugo.controller('UsersCtrl', ['$scope', '$http', 'UserService', function ($scope, $http, UserService) {
    var usersPromise = UserService.getAll();
    usersPromise.then(function(data) {
        $scope.users = data;
    });
}]);
