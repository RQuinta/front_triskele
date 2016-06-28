(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('isOffline', isOfflineDirective);

    /** @ngInject */
    function isOfflineDirective(AuthService)
    {
        return {
            restrict: 'A',
            link : function (scope, element, attrs)
            {   
                if (AuthService.isLogged()) {
                    element.addClass('hide');
                };

                scope.$on('permissionsChanged', function(){
                    console.log('permissionsChanged isOfflineDirective');
                    if (AuthService.isLogged()) {
                        element.addClass('hide');
                    }
                    else{
                        element.removeClass('hide');
                    }
                });
            }
        };
    }
})();