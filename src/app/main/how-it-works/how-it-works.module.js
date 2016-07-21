(function ()
{
    'use strict';

    angular
        .module('app.how-it-works', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.how-it-works', {
                url    : '/como-funciona',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/how-it-works/how-it-works.html',
                        controller : 'HowItWorksController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/how-it-works');

    }
})();
