(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController(api, $state)
    {
        var vm = this;
        // Data

        // Methods

        init()
        vm.updatePassword = updatePassword;

        function init() {
            api.user.show_by_token({ token: $state.params.token }, function(user){
                vm.user = user;
            }, function(){
                $state.go('app.pages.error-404');
            })
        }

        function updatePassword(){
            api.user.update({ id: vm.user.id,  user: vm.form }, function(){
                vm.sent = true;
            });
        }

        //////////
    }
})();