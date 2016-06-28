(function ()
{
    'use strict';

    angular
        .module('app.footer')
        .controller('FooterController', FooterController);

    /** @ngInject */
    function FooterController($rootScope, $translate)
    {
        var vm = this;

        vm.languages = {
            pt: {
                'title'      : 'Portugues',
                'translation': 'TOOLBAR.PORTUGUESE',
                'code'       : 'pt',
                'flag'       : 'br'
            },
            en: {
                'title'      : 'English',
                'translation': 'TOOLBAR.ENGLISH',
                'code'       : 'en',
                'flag'       : 'us'
            }
        };

        // Data

        // Methods
        vm.changeLanguage = changeLanguage;

        //////////

        init();
        
        function init()
        {

            // Get the selected language directly from angular-translate module setting
            vm.selectedLanguage = vm.languages[$translate.preferredLanguage()];
        }


        function changeLanguage(lang)
        {
            vm.selectedLanguage = lang;

            // Change the language
            $translate.use(lang.code);
        }

    }

})();