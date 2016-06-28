(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('isLogged', isLoggedDirective);

    /** @ngInject */
    function isLoggedDirective(AuthService)
    {
        return {
            restrict: 'A',
            link : function (scope, element, attrs)
            {   
                if (!AuthService.isLogged()) {
                    element.addClass('hide');
                };

                scope.$on('permissionsChanged', function(){
                    if (AuthService.isLogged()) {
                        element.removeClass('hide');
                    }
                    else{
                        element.addClass('hide');
                    }
                });
            }
        };
    }
})();