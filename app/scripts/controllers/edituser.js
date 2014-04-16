'use strict';

Hugo.controller('EditUserCtrl', ['$scope', '$cookieStore', '$routeParams', '$http', '$location', 'UserService', 'API', function ($scope, $cookieStore, $routeParams, $http, $location, UserService, API) {
    var rolePromise = UserService.getRoles();
    rolePromise.then(function(data) {
        $scope.roles = data;
    });
    var userPromise = UserService.get($routeParams.userId);
    userPromise.then(function(data) {
        $scope.user = data;
        var role = $.grep($scope.roles, function(element) {
            return element.user_role == $scope.user.user_role;
        })[0];
        $scope.user.user_role = role.id;
    });
    $scope.error = '';
    $scope.type = 'edit';

    $scope.save = function() {
        $("#submit").attr('disabled','disabled');
        $http({
            method: 'PUT',
            url: API + '/auth/user/' + $routeParams.userId,
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: $scope.user
        }).success(function(data){
            $scope.user = data;
            $scope.error = '';
            $("#submit").removeAttr('disabled');
        }).error(function(data) {
            $scope.error = data.error;
            $("#submit").removeAttr('disabled');
        });
    };

    $scope.delete = function() {
        $("#delete").attr('disabled','disabled');
        $http({
            method: 'DELETE',
            url: API + '/auth/user/' + $scope.user.id,
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') }
        }).success(function(data){
            $scope.error = '';
            $location.path('admin/user');
        }).error(function(data) {
            $scope.error = data.error;
            $("#delete").removeAttr('disabled');
        });
    };
}]);
