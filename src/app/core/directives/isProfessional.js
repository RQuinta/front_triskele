(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('isProfessional', isProfessionalDirective);

    /** @ngInject */
    function isProfessionalDirective(AuthService)
    {
        return {
            restrict: 'A',
            link : function (scope, element, attrs)
            {   
                if (!AuthService.isProfessional) {
                    element.hide();
                };

                scope.$on('permissionsChanged', function(){
                    if (AuthService.isProfessional) {
                        element.show();
                    }
                    else{
                        element.hide();
                    }
                });
            }
        };
    }
})();