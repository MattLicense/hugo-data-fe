'use strict';

Hugo.service('ReportService', ['$q', '$http', '$cookieStore', 'API', function ($q, $http, $cookieStore, API) {
    this.getAll = function() {
        var deferred = $q.defer();
        var options = {
            method: 'GET',
            url: API + '/report',
            responseType: 'json'
        };
        if(typeof($cookieStore.get('token')) != 'undefined') {
            options.headers = { 'Authorization': 'Bearer ' + $cookieStore.get('token') };
        }
        $http(options).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };
    this.get = function(id) {
        var deferred = $q.defer();
        var options = {
            method: 'GET',
            url: API + '/report/'  + id,
            responseType: 'json'
        };
        if(typeof($cookieStore.get('token')) != 'undefined') {
            options.headers = { 'Authorization': 'Bearer ' + $cookieStore.get('token') };
        }
        $http(options).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };
}]);
