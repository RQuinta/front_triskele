(function ()
{
    'use strict';

    angular
        .module('app.doubts', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.doubts', {
                url    : '/duvidas',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/doubts/doubts.html',
                        controller : 'DoubtsController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/doubts');

    }
})();
