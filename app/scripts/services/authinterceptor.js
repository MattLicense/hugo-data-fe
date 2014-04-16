'use strict';

Hugo.factory('authInterceptor', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
        request: function(config) {
            config.headers = config.headers || {};

        }
    };
});
