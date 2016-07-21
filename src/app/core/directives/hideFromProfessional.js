(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('hideFromProfessional', hideFromProfessionalDirective);

    /** @ngInject */
    function hideFromProfessionalDirective(AuthService)
    {
        return {
            restrict: 'A',
            link : function (scope, element, attrs)
            {   
                if (AuthService.isProfessional()) {
                    element.addClass('hide');
                };

                scope.$on('permissionsChanged', function(){
                    if (AuthService.isProfessional()) {
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