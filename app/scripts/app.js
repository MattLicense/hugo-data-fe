'use strict';

// we define a global variable Hugo which is to be used with all of the Angular.js components
// ngRoute, ngCookies, googlechart and angularFileUpload are extensions that add functionality to the framework
window.Hugo = angular.module('hwDataApp', ['ngRoute', 'ngCookies', 'googlechart', 'angularFileUpload']);

Hugo.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    /**
     * This defines all of the routes of the web application, defining which controllers handle the information and the views to display the data
     */
    $routeProvider.when('/', { templateUrl: 'views/home.html', controller: 'MainCtrl', access: { authRequired: false } })
        .when('/home', { templateUrl: 'views/home.html', controller: 'MainCtrl', access: { authRequired: false } })
        .when('/report/:reportId', { templateUrl: 'views/report.html', controller: 'ReportCtrl', access: { authRequired: false } })
        .when('/admin/client', { templateUrl: 'views/admin/clients.html', controller: 'ClientCtrl', access: { authRequired: true, scope: 'client:all' } })
        .when('/admin/client/new', { templateUrl: 'views/admin/client.html', controller: 'NewClientCtrl', access: { authRequired: true, scope: 'client:all' } })
        .when('/admin/client/:clientId', { templateUrl: 'views/admin/client.html', controller: 'EditClientCtrl', access: { authRequired: true, scope: 'client:all' } })
        .when('/admin/user', { templateUrl: 'views/admin/users.html', controller: 'UsersCtrl', access: { authRequired: true, scope: 'auth:all' } })
        .when('/admin/user/new', { templateUrl: 'views/admin/user.html', controller: 'NewUserCtrl', access: { authRequired: true, scope: 'auth:all' } })
        .when('/admin/user/:userId', { templateUrl: 'views/admin/user.html', controller: 'EditUserCtrl', access: { authRequired: true, scope: 'auth:all' } })
        .when('/admin/report', { templateUrl: 'views/admin/reports.html', controller: 'ListReportCtrl', access: { authRequired: true, scope: 'report:all' } })
        .when('/admin/report/new', { templateUrl: 'views/admin/new-report.html', controller: 'NewReportCtrl', access: { authRequired: true, scope: 'report:all' } })
        .when('/admin/report/:reportId', { templateUrl: 'views/admin/edit-report.html', controller: 'EditReportCtrl', access: { authRequired: true, scope: 'report:all' } })
        .when('/login', { templateUrl: 'views/login.html', controller: 'LoginCtrl', access: { authRequired: false } })
        .when('/logout', { controller: 'LogoutCtrl', template: '<div></div>', access: { authRequired: true, scope: '*' } })
        .when('/forbidden', { templateUrl: 'views/403.html' })
        .otherwise({ templateUrl: 'views/404.html' });

    /**
     * Here we intercept any HTTP requests made to make it possible to display a loading icon when waiting for API requests
     * An angular directive (/scripts/directives/loading.js) is used to display the loading icon.
     */
    $httpProvider.interceptors.push(['$q', '$rootScope', '$location', 'UserFactory', function($q, $rootScope, $window, UserFactory) {
        return {
            // be the request is run, we send a 'loading' message through the application
            'request': function(config) {
                $rootScope.$broadcast('loading');
                return config || $q.when(config);
            },
            // before the response is sent, we send a 'loaded' message through the application
            // we log the user out if the response
            'response': function(config) {
                $rootScope.$broadcast('loaded');
                return config || $q.when(config);
            },
            // here we handle any errors
            'responseError': function(config) {
                $rootScope.$broadcast('loaded');
                if(config.status == 401) {
                    UserFactory.logout();
                    $window.location.replace('/');
                    return;
                }
                return config || $q.reject(config);
            }
        }
    }]);
}]);

/**
 * This intercepts all of the route changes to check
 */
Hugo.run(['$rootScope', '$location', 'UserFactory', function($rootScope, $location, UserFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if(!nextRoute.access.authRequired) { return; }                  // do nothing if there are no restrictions on the route
        if(!UserFactory.isLogged) { $location.path('login'); return; }  // if authorisation is required and no user is logged in
        if(nextRoute.access.scope == '*') { return; }                   // allow a logged in user through to any views with scope given as '*', else forbid the user
        if(UserFactory.scope.indexOf(nextRoute.access.scope) == -1 ) { $location.path('forbidden'); return; }
    });
}]);

/**
 * Here we define the base URL of the API to be used throughout the application.
 */
Hugo.value('API', 'http://api.mattlicense.co.uk');

google.load("visualization", "1", {packages:['corechart', 'table']});