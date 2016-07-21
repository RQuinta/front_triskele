(function ()
{
    'use strict';

    angular
        .module('app.profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.profile', {
                url    : '/profile/:id',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/profile/profile.html',
                        controller : 'ProfileController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/profile');

    }
})();
