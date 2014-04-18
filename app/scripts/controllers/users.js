'use strict';

Hugo.controller('UsersCtrl', ['$scope', '$http', 'UserService', 'Auth', function($scope, $q, UserService, Auth) {
    Auth.checkLogin();
    var usersPromise = UserService.getAll();
    usersPromise.then(function(data) {
        $scope.users = data;
    });
}]);
