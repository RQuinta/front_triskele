(function ()
{
    'use strict';

    angular
        .module('app.service-detail', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.service-detail', {
                url    : '/aventura/:service_id',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/service-detail/service-detail.html',
                        controller : 'ServiceDetailController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/service-detail');

    }
})();
