(function ()
{
    'use strict';

    angular
        .module('app.me', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.me', {
                url    : '/me',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/me/me.html',
                        controller : 'MeController as vm'
                    }
                },
                data   : {
                    accessRule: function(AuthService) {
                        return AuthService.isLogged();
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/me');

    }
})();
