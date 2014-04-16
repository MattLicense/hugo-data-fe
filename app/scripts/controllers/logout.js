'use strict';

Hugo.controller('LogoutCtrl', ['$scope', 'UserFactory', function ($scope, UserFactory) {
    $scope.logout = function() {
        UserFactory.logout();
        window.location.replace('/');
    };

    $scope.logout();
}]);
