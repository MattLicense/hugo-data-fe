'use strict';

Hugo.controller('NewClientCtrl', ['$scope', '$cookieStore', '$http', '$location', 'API', function ($scope, $cookieStore, $http, $location, API) {
    $scope.client = {};
    $scope.error = '';
    $scope.type = 'new';

    $scope.save = function() {
        $("#submit").attr('disabled','disabled');
        $http({
            method: 'POST',
            url: API + '/client/',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') },
            data: $scope.client
        }).success(function(data){
            $scope.client = data;
            $scope.error = '';
            $location.path('admin/client/'+data.id);
        }).error(function(data) {
            $scope.error = data.error;
            $("#submit").removeAttr('disabled');
        });
    };
}]);
