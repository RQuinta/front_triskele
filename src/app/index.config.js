(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($facebookProvider)
    {
    	/*$facebookProvider.setVersion("v2.6");*/
   		$facebookProvider.setAppId('1733799820237301');
        $facebookProvider.setPermissions("email");
    }

})();