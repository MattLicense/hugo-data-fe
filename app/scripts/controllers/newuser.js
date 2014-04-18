'use strict';

Hugo.controller('NewUserCtrl', ['$scope', '$cookieStore', '$http', '$location', 'UserService', 'Auth', 'API', function ($scope, $cookieStore, $http, $location, UserService, Auth, API) {
    Auth.checkLogin();

    var rolePromise = UserService.getRoles();
    rolePromise.then(function(data) {
        $scope.roles = data;
    });

    $scope.user = {
        user_role: 1
    };
    $scope.error = '';
    $scope.type = 'new';

    $scope.save = function() {
        $("#submit").attr('disabled','disabled');
        $http({
            method: 'POST',
            url: API + '/auth/user/',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: $scope.user
        }).success(function(data){
            $scope.user = data;
            $scope.error = '';
            $location.path('admin/user/'+data.id);
        }).error(function(data) {
            $scope.error = data.error;
            $("#submit").removeAttr('disabled');
        });
    };
}]);
