(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, AuthService)
    {

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, destination)
        {   
            $rootScope.loadingProgress = true;
            if ( !_.has(destination.data, 'accessRule') || !angular.isFunction(destination.data.accessRule) ) return;
            if (!destination.data.accessRule(AuthService)) {
                event.preventDefault();
                if (_.has(destination.data, 'redirectTo')) $state.go(destination.data.redirectTo);
            }
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        })
    }
})();