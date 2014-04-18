'use strict';

Hugo.directive('ngConfirmClick', function () {
    return {
        link: function(scope, element, attr) {
            var message = attr.ngConfirmClick || "Are you sure you want to perform this action?";
            var action = attr.confirmedClick;
            element.bind('click', function(e) {
                if(window.confirm(message)) {
                    scope.$eval(action);
                }
            });
        }
    };
});