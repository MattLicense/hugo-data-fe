'use strict';

Hugo.controller('LoginCtrl', ['$scope', '$http', '$window', '$cookieStore', '$location', '$q', 'UserFactory', 'API', function ($scope, $http, $window, $cookieStore, $location, $q, UserFactory, API) {
    $scope.username = '';
    $scope.password = '';
    $scope.token = '';
    $scope.scope = '';
    $scope.error = '';

    $scope.User = UserFactory;

    $scope.login = function() {
        $scope.error = '';
        $http({
            method: 'POST',
            url: API + '/auth/token',
            headers: { 'Authorization': 'Basic ' + btoa($scope.username + ':' + $scope.password) },
            data: { 'grant_type': 'client_credentials' }
        }).success(function(data) {
            $scope.User.login(data, $scope.username);
            $scope.password = '';   // clear the password
            $window.location.replace('/');
        }).error(function(data) {
            $scope.User.logout();

            $scope.username = '';
            $scope.password = '';
            $scope.error = 'Invalid login. Check username and password';
        });
    };
}]);
