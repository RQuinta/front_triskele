(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login-v2', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_login-v2', {
            url      : '/login',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_login-v2': {
                    templateUrl: 'app/main/pages/auth/login-v2/login-v2.html',
                    controller : 'LoginV2Controller as vm'
                }
            },
            data   : {
                accessRule: function(AuthService) {
                    return !AuthService.isLogged();
                },
                redirectTo : 'app.me'
            },
            bodyClass: 'login-v2'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/login-v2');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.login-v2', {
            title : 'Login',
            state : 'app.pages_auth_login-v2',
            weight: 2
        });
    }

})();
