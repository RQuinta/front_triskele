(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController(api)
    {
        var vm = this;
        // Data


        // Methods
        
        vm.sendResetLink = sendResetLink;

        function sendResetLink() { 
            api.user.forget_password(vm.user, function(response) {
                vm.sent = true;
            }, function (response) {

            });
        }
        //////////
    }
})();