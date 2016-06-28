(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register-v2')
        .controller('RegisterV2Controller', RegisterV2Controller);

    /** @ngInject */
    function RegisterV2Controller(api)
    {
     var vm = this;
        // Data

        // Methods
        vm.create = function(){
            api.user.create({
                user: vm.form
            }, function(resource){
                console.log('foi');
            }, function() {
            console.log('nao foi');
            });
            
        };
    }
})();