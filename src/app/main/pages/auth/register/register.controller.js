(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(api, AuthService)
    {
     var vm = this;
        // Data

        // Methods
        vm.create = function(){
            api.user.create({user: vm.credencials}, function(user){
                AuthService.setUser(user);
                $window.history.back();
            }, function(error){
                vm.emailError = _.has(error, 'data.errors.email');
            }); 
        };

        vm.loginWithFacebook = function(){
            AuthService.facebookLogin();
        };
    }
})();