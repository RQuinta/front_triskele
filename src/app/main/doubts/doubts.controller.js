(function ()
{
    'use strict';

    angular
        .module('app.doubts')
        .controller('DoubtsController', DoubtsController);

    /** @ngInject */
    function DoubtsController($state, api)
    {
        var vm = this;

        // Data

        // Methods

        vm.sendDout = sendDout;

        function sendDout(){
            api.doubts.create({ 'doubt': vm.doubt }, function() {
                vm.sent = true;
                vm.success = true;
            }, function() {
                vm.error = true;
            });    
        }
    }
})();

