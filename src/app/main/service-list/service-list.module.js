(function ()
{
    'use strict';

    angular
        .module('app.service-list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.service-list', {
            url      : '/aventuras',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/service-list/service-list.html',
                    controller : 'ServiceListController as vm'
                }
            },
            bodyClass: 'service-list'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/service-list');

        // Api

        // Navigation
        msNavigationServiceProvider.saveItem('apps.service-list', {
            title : 'Aventuras',
            icon  : 'icon-checkbox-marked',
            state : 'app.service-list',
            badge : {
                content: 3,
                color  : '#4CAF50'
            },
            weight: 7
        });
    }

})();
