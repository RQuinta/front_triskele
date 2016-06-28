(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(AuthService)
    {
     var vm = this;
        // Data

        // Methods
        vm.create = function(){
            AuthService.apiUserCreate(vm.credencials);
        };

        vm.loginWithFacebook = function(){
            AuthService.facebookLogin();
        };
    }
})();