'use strict';

Hugo.service('Auth', ['$http', '$location', '$cookieStore', 'UserFactory', 'API', function ($http, $location, $cookieStore, UserFactory, API) {
    this.scope = '';
    this.token = '';
    this.username = '';
    this.isLogged = false;

    this.checkLogin = function() {
        var self = this;
        $http({
            method: 'GET',
            url: API + '/auth/checktoken',
            headers: { 'Authorization': 'Bearer ' + $cookieStore.get('token') }
        }).success(function(data) {
            self.scope = data.scope;
            self.token = data.token;
            self.username = data.user;
            self.isLogged = true;
        }).error(function(data) {
            self.scope = '';
            self.token = '';
            self.username = '';
            self.isLogged = false;
            UserFactory.logout();
            $location.path('login');
        });
    };
}]);
