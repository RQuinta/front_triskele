(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config);

    /** @ngInject */
    function config($ariaProvider, $logProvider, msScrollConfigProvider, $translateProvider, fuseConfigProvider, cloudinaryProvider, uiGmapGoogleMapApiProvider, $pgCheckoutProvider)
    {
        // Enable debug logging
        $logProvider.debugEnabled(true);
        
        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('pt');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        /*eslint-disable */

        // ng-aria configuration
        $ariaProvider.config({
            tabindex: false
        });

        // Fuse theme configurations
        fuseConfigProvider.config({
            'disableCustomScrollbars'        : false,
            'disableCustomScrollbarsOnMobile': true,
            'disableMdInkRippleOnMobile'     : true
        });

        // msScroll configuration
        msScrollConfigProvider.config({
            wheelPropagation: true
        });

        uiGmapGoogleMapApiProvider.configure({
          //    key: 'your api key',
          libraries: 'places' // Required for SearchBox.
        });

        $pgCheckoutProvider.setEncryptKey('ek_test_EOnyktVOJexsia8JqVsBpzHeCLWAvr');

        cloudinaryProvider.set("cloud_name", "dwpckwhch").set("upload_preset", "byiqmv4h");
        
        // msScroll configuration
        msScrollConfigProvider.config({
            wheelPropagation: true
        });

        /*eslint-enable */
    }
})();