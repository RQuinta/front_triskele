(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /** @ngInject */
    function ToolbarController($rootScope, $mdSidenav, $translate, $mdToast, searchService, $state, AuthService)
    {
        var vm = this;

        // Data
        vm.searchService = searchService;

        vm.bodyEl = angular.element('body');
        
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

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.logout = logout;
        vm.changeLanguage = changeLanguage;
        vm.setUserStatus = setUserStatus;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;
        vm.showSearch = showSearch;
        vm.howItWorks = howItWorks;
        vm.doubts = doubts;
        vm.home = home;
        vm.getUserName = getUserName;
        vm.getUserImage = getUserImage;

        //////////

        init();

        /**
         * Initialize
         */
        function init()
        {

            // Get the selected language directly from angular-translate module setting
            vm.selectedLanguage = vm.languages[$translate.preferredLanguage()];
        }

        function logout(){
            AuthService.unsetToken();
        }


        function showSearch(){
            if ($state.current.name === 'app.service-list') return false
            if ($state.current.name === 'app.sample') return false
            return true    
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Sets User Status
         * @param status
         */
        function setUserStatus(status)
        {
            vm.userStatus = status;
        }

        function howItWorks()
        {
            $state.go('app.how-it-works');
        }

        function doubts()
        {
            $state.go('app.doubts');
        }

        function home()
        {
            $state.go('app.sample');
        }

        /**
         * Logout Function
         */
        function logout()
        {
            AuthService.unsetToken();
        }

        function getUserName(){
            if (AuthService.isLogged() ) return AuthService.getUser().name;   
        }

        function getUserImage(){
            if (AuthService.isLogged() ) return AuthService.getUser().image;   
        } 

        /**
         * Change Language
         */
        function changeLanguage(lang)
        {
            vm.selectedLanguage = lang;

            // Change the language
            $translate.use(lang.code);
        }

        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu()
        {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }
    }

})();
