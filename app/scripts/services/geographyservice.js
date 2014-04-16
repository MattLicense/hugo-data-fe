'use strict';

Hugo.service('GeographyService', ['$q', '$http', 'API', function($q, $http, API) {
    this.getLAs = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/geo/locals'
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    this.getLEPs = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/geo/leps'
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    this.getRegions = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API + '/geo/regions'
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
}]);
