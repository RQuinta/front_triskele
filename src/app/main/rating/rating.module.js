(function ()
{
    'use strict';

    angular
        .module('app.rating', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider.state('app.rating', {
            url      : '/avaliacao/:token',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.rating': {
                    templateUrl: 'app/main/rating/rating.html',
                    controller : 'RatingController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/rating');
    }

})();