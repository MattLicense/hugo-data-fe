'use strict';

Hugo.service('UserService', ['$q', '$http', 'API', function ($q, $http, API) {
    this.getAll = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/auth/user',
            responseType: 'json'
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    this.get = function(id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/auth/user/' + id
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    this.getRoles = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/auth/user/roles/'
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
}]);
