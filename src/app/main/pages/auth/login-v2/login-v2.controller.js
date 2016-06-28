(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login-v2')
        .controller('LoginV2Controller', LoginV2Controller);

    /** @ngInject */
    function LoginV2Controller(api, AuthService)
    {
        var vm = this;
        // Data
         vm.newUser = new api.user();

        // Methods
        vm.login = function(){
            AuthService.apiLogin(vm.credencials);
        };

        vm.loginWithFacebook = function(){
            AuthService.facebookLogin();
        };

    }
})();