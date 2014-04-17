'use strict';

Hugo.controller('LogoutCtrl', ['$scope', '$location', 'UserFactory', function ($scope, $location, UserFactory) {
    $scope.logout = function() {
        UserFactory.logout();
        $location.path('home');
    };

    $scope.logout();
}]);
