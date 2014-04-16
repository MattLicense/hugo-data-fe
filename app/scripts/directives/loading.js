'use strict';

Hugo.directive('loading', function () {
    return {
        restrict: 'A',
        template: '<div class="loading"><span class="icon-loading"></span><br>Loading...</div>',
        link: function(scope, element, attrs) {
            // when the application broadcasts the 'loading' message, show the element
            scope.$on("loading", function(event) {
                element.css({"display": "block"});
            });
            // when the application broadcasts the 'loaded' message, hide the element
            scope.$on("loaded", function(event) {
                element.css({"display": "none"});
            })
        }
    };
});
