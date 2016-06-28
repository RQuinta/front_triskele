(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            'app.sample',

            'ngFacebook',

            'jkuri.gallery',

            'app.pages',

            'app.service-list',

            'app.service-detail',

            'app.service-create',

            'app.rating',

            'app.doubts',

            'app.how-it-works',

            'app.profile',

            'app.me',

            'app.footer',

            'app.payment'
            
        ]);
})();