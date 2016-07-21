(function ()
{
    'use strict';

    angular
        .module('app.service-create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.service-create', {
                url    : '/service-create',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/service-create/service-create.html',
                        controller : 'ServiceCreateController as vm'
                    }
                },
                data   : {
                    accessRule: function(AuthService) {
                        return AuthService.isProfessional();
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/service-create');

    }
})();
