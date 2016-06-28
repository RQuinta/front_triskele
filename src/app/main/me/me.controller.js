(function ()
{
  'use strict';

  angular
  .module('app.me')
  .controller('MeController', MeController);

  /** @ngInject */
    function MeController($scope, $state, AuthService, $mdDialog, api, $mdToast, $mdMedia)
    {
        var vm = this;
        // Data

        // Methods
		    vm.deleteConfirm = deleteConfirm;
        vm.pauseConfirm = pauseConfirm;
        vm.openUserEditDialog = openUserEditDialog;
        vm.openServiceEditDialog = openServiceEditDialog;

        init();

        function init(){
            vm.user = AuthService.getUser();
            if (AuthService.isProfessional() ) {
                api.professional.show({ id: vm.user.professional.id}, function(professional) {
                    vm.servicesList = professional.services;
                    vm.acquisitionsList = professional.acquisitions;
                }, function() {
                    console.log('b');
                });
            }
            vm.backgroundImage = "http://res.cloudinary.com/dwpckwhch/image/upload/q_80/" + vm.user.background_image + ".jpg";
        }

        function deleteConfirm(ev, service) 
        {
            var confirm = $mdDialog.confirm()
                  .title('Deseja deletar o serviço?')
                  .ariaLabel('Deletar Serviço')
                  .targetEvent(ev)
                  .ok('Sim')
                  .cancel('Não');
            $mdDialog.show(confirm).then(function() {
                service.deleted = true;
                _.remove(vm.servicesList, service);
                service.$delete();
            });
        };

        function pauseConfirm(ev, service) 
        {
            var confirm = $mdDialog.confirm()
                  .title('Deseja pausar o serviço?')
                  .ariaLabel('Pausar Serviço')
                  .targetEvent(ev)
                  .ok('Sim')
                  .cancel('Não');
            $mdDialog.show(confirm).then(function() {
                var copyService = angular.copy(this.service);
                copyService.active = false;
                api.service.update({id: service.id , service: service}, function(){
                  this.service.active = false;
                }.bind({ 'service': this.service }));
            }.bind({ 'service': service }));
        };

        function openServiceEditDialog(service, ev) {
            $mdDialog.show({ 
               controller: 'editServiceDialogController',
               controllerAs: 'vm',
               templateUrl: 'app/main/me/dialogs/edit-service/edit-service-dialog.html',
               parent: angular.element(document.body),
               clickOutsideToClose:true,
               locals: { 'service': service },
               fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
            });
        };

        function openUserEditDialog(service, ev) {
            $mdDialog.show({ 
               controller: 'editUserDialogController',
               controllerAs: 'vm',
               templateUrl: 'app/main/me/dialogs/edit-user/edit-user-dialog.html',
               parent: angular.element(document.body),
               clickOutsideToClose:true,
               locals: { 'user': vm.user },
               fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
            });
        };

    }
})();
