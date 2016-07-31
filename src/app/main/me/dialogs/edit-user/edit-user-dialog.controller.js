(function ()
{
    'use strict';

    angular.module('app.me').controller('editUserDialogController', editUserDialogController);

    /** @ngInject */
    function editUserDialogController($mdDialog, CloudnaryService, $q, api, user, $timeout, $rootScope, AuthService)
    {
        var vm = this;

        // Data

        // Methods
        vm.saveChanges = saveChanges;
        vm.closeDialog = closeDialog;
        vm.saveCropImage = saveCropImage;
        vm.languages = [];

        init();

        function init()
        {
            api.language.index({}, function(resource) {
              vm.languages = resource;
            });
            vm.copyUser = angular.copy(user); 
            vm.copyProfessional = angular.copy(user.professional); 
            vm.selectedLanguages = _.get(vm.copyProfessional, 'languages', []);
            vm.backgroundImage = "http://res.cloudinary.com/dwpckwhch/image/upload/q_80/" + user.background_image + ".jpg";
            vm.lastBackgroundImage = "http://res.cloudinary.com/dwpckwhch/image/upload/q_80/" + user.background_image + ".jpg";
        }

        function saveCropImage(){
            vm.newProfilePicture = vm.cropper.croppedImage;
            vm.cropper.sourceImage = null;
        }

        function saveChanges()
        {   
            if (vm.copyProfessional) { 
                vm.copyProfessional.language_ids = _.map(vm.selectedLanguages, 'id');
                api.professional.update({ id: vm.copyUser.professional.id, professional: vm.copyProfessional }, function(){
                    $rootScope.$broadcast('updateUser');
                });
            }
            
            if (vm.newProfilePicture && vm.backgroundImage != vm.lastBackgroundImage) {
                var profileImage = CloudnaryService.uploadFile(vm.newProfilePicture);
                var backgroundImage = CloudnaryService.uploadFile(vm.backgroundImage);
                $q.all([profileImage, backgroundImage]).then(_.spread(function (profImage, backImage) {
               		vm.copyUser.image = profImage.data.public_id;
               		vm.copyUser.background_image = backImage.data.public_id;
                    api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                        AuthService.updateUserEmail(vm.copyUser.email);
                        $rootScope.$broadcast('updateUser');
                        $mdDialog.hide();
                    });
        		}.bind(vm)));
            }
            else if (vm.newProfilePicture) {
                var profileImage = CloudnaryService.uploadFile(vm.newProfilePicture);
                profileImage.then(function (profileImage){
                    vm.copyUser.image = profileImage.data.public_id;
                    api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                        AuthService.updateUserEmail(vm.copyUser.email);
                        $rootScope.$broadcast('updateUser');
                        $mdDialog.hide();
                    });     
                }.bind(vm));
            }
            else if (vm.backgroundImage != vm.lastBackgroundImage) {
                var backgroundImage = CloudnaryService.uploadFile(vm.backgroundImage);
                backgroundImage.then(function (backImage){
                    vm.copyUser.background_image = backImage.data.public_id;
                    api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                        AuthService.updateUserEmail(vm.copyUser.email);
                        $rootScope.$broadcast('updateUser');
                        $mdDialog.hide();
                    });     
                }.bind(vm));
            }
            else{
                api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                    AuthService.updateUserEmail(vm.copyUser.email);
                    $rootScope.$broadcast('updateUser');    
                    $mdDialog.hide();
                }, function(response) {
                    vm.emailError = _.has(response, 'data.errors.email');
                });    
            }
            
            
        }

        function createFilterFor(query) {
          var lowercaseQuery = _.lowerCase(query);

          return function filterFn(language) {
            return (_.lowerCase(language.name).indexOf(lowercaseQuery) === 0);
          };
        }

        vm.queryLanguageSearch = function(query) {
          var results = query ? vm.languages.filter(createFilterFor(query)) : [];
          return results;
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