'use strict';

Hugo.service('UserFactory', ['$location', '$cookieStore', function ($location, $cookieStore) {
    this.isLogged = false;
    this.username = '';
    this.token = '';
    this.scope = '';

    this.login = function (token) {
        this.isLogged = true;
        this.token = token.token; this.scope = token.scope; this.username = token.user;
        $cookieStore.put('token', this.token);
        $cookieStore.put('user', this.username);
        $cookieStore.put('scope', this.scope);
    };

    this.checkLogin = function() {
        if( typeof($cookieStore.get('scope')) != 'undefined' &&
            typeof($cookieStore.get('token')) != 'undefined' &&
            typeof($cookieStore.get('user')) != 'undefined')
        {
            this.isLogged = true;
            this.username = $cookieStore.get('user');
            this.token = $cookieStore.get('token');
            this.scope = $cookieStore.get('scope');
        } else {
            this.logout();
        }
    };

    this.logout = function() {
        $cookieStore.remove('token');
        $cookieStore.remove('user');
        $cookieStore.remove('scope');
        this.scope = '';
        this.token = '';
        this.username = '';
        this.isLogged = false;
        $location.path('home');
    };

    this.checkLogin();
}]);
