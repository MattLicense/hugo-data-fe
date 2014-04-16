'use strict';

Hugo.factory('UserFactory', ['$cookies', '$cookieStore', function ($cookies, $cookieStore) {
    var factory = {
        isLogged: false,
        username: '',
        token: '',
        scope: '',
        login: function (token, username) {
            this.isLogged = true; this.username = username;
            this.token = token.token; this.scope = token.scope;
            $cookieStore.put('token', this.token);
            $cookieStore.put('user', this.username);
            $cookieStore.put('scope', this.scope);
        },
        checkLogin: function() {
            if( typeof($cookies.scope) != 'undefined' &&
                typeof($cookies.token) != 'undefined' &&
                typeof($cookies.user) != 'undefined')
            {
                this.scope = $cookieStore.get('scope');
                this.token = $cookieStore.get('token');
                this.username = $cookieStore.get('user');
                this.isLogged = true;
            } else {
                this.logout();
            }
        },
        logout: function() {
            $cookieStore.remove('token');
            $cookieStore.remove('user');
            $cookieStore.remove('scope');
            this.scope = '';
            this.token = '';
            this.username = '';
            this.isLogged = false;
        }

    };

    factory.checkLogin();

    return factory;
}]);
