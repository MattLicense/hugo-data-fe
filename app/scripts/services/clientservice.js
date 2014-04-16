'use strict';

Hugo.service('ClientService', ['$q', '$http', 'API', function($q, $http, API) {
    this.getAll = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/client',
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
            url: API + '/client/' + id
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };
}]);
