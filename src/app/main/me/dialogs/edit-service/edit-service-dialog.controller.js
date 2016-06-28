(function ()
{
    'use strict';

    angular.module('app.me').controller('editServiceDialogController', editServiceDialogController);

    /** @ngInject */
    function editServiceDialogController($mdDialog, api, service, $timeout)
    {
        var vm = this;
        vm.bounds = {};
        vm.bounds.left = 0;
        vm.bounds.right = 0;
        vm.bounds.top = 0;
        vm.bounds.bottom = 0;

        // Data

        // Methods
        vm.saveChanges = saveChanges;
        vm.closeDialog = closeDialog;

        init();

        //////////

        /**
         * Initialize
         */
        function init()
        {
            vm.service_changes = { 'service_id': service.id };  
        }

        function saveChanges()
        {
            api.service_changes.create({ service_changes: vm.service_changes }, function(){
            	vm.success = true;
            	$timeout(function() {
				    $mdDialog.hide();
				}, 2000);
            }, function() {
                vm.error = true;
            }); 
        }

        /**
         * Close the dialog
         */
        function closeDialog()
        {
            $mdDialog.cancel();
        }
    }
})();