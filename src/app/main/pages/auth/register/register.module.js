(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_register', {
            url      : '/cadastro',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_register': {
                    templateUrl: 'app/main/pages/auth/register/register.html',
                    controller : 'RegisterController as vm'
                }
            },
            data   : {
                accessRule: function(AuthService) {
                    return !AuthService.isLogged();
                },
                redirectTo : 'app.me'
            },
            bodyClass: 'register'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/register');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.register', {
            title : 'Cadastro',
            state : 'app.pages_auth_register',
            weight: 3
        });
    }

})();
