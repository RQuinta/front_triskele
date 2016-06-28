(function ()
{
    'use strict';

    angular.module('app.me').controller('editUserDialogController', editUserDialogController);

    /** @ngInject */
    function editUserDialogController($mdDialog, CloudnaryService, $q, api, user, $timeout, $rootScope)
    {
        var vm = this;

        // Data

        // Methods
        vm.saveChanges = saveChanges;
        vm.closeDialog = closeDialog;
        vm.saveCropImage = saveCropImage;

        init();

        //////////

        /**
         * Initialize
         */
        function init()
        {
            vm.copyUser = angular.copy(user);  
            vm.backgroundImage = "http://res.cloudinary.com/dwpckwhch/image/upload/q_80/" + user.background_image + ".jpg";
            vm.lastBackgroundImage = "http://res.cloudinary.com/dwpckwhch/image/upload/q_80/" + user.background_image + ".jpg";
        }

        function saveCropImage(){
            vm.newProfilePicture = vm.cropper.croppedImage;
            vm.cropper.sourceImage = null;
        }

        function saveChanges()
        {
            if (vm.newProfilePicture && vm.backgroundImage != vm.lastBackgroundImage) {
                var profileImage = CloudnaryService.uploadFile(vm.newProfilePicture);
                var backgroundImage = CloudnaryService.uploadFile(vm.backgroundImage);
                $q.all([profileImage, backgroundImage]).then(_.spread(function (profImage, backImage) {
               		vm.copyUser.image = profImage.data.public_id;
               		vm.copyUser.background_image = backImage.data.public_id;
                    api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                        user.image = vm.copyUser.image;
                        user.background_image = vm.copyUser.background_image;
                        user.about = vm.copyUser.about;
                        user.phone = vm.copyUser.phone;
                        user.email = vm.copyUser.email;
                        $rootScope.$broadcast("$event");
                        $mdDialog.hide();
                    });
        		}.bind(vm)));
            }
            else if (vm.newProfilePicture) {
                var profileImage = CloudnaryService.uploadFile(vm.newProfilePicture);
                profileImage.then(function (profileImage){
                    vm.copyUser.image = profileImage.data.public_id;
                    api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                        user.image = vm.copyUser.image;
                        user.about = vm.copyUser.about;
                        user.phone = vm.copyUser.phone;
                        user.email = vm.copyUser.email;
                        $mdDialog.hide();
                    });     
                }.bind(vm));
            }
            else if (vm.backgroundImage != vm.lastBackgroundImage) {
                var backgroundImage = CloudnaryService.uploadFile(vm.backgroundImage);
                backgroundImage.then(function (backImage){
                    vm.copyUser.background_image = backImage.data.public_id;
                    api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                        user.background_image = vm.copyUser.background_image;
                        user.about = vm.copyUser.about;
                        user.phone = vm.copyUser.phone;
                        user.email = vm.copyUser.email;
                        $rootScope.$broadcast("$event");
                        $mdDialog.hide();
                    });     
                }.bind(vm));
            }
            else{
                api.user.update({ id: vm.copyUser.id, user: vm.copyUser }, function(){
                    user.about = vm.copyUser.about;
                    user.phone = vm.copyUser.phone;
                    user.email = vm.copyUser.email;
                    $mdDialog.hide();
                }, function(response) {
                    vm.emailError = _.has(response, 'data.errors.email');
                });    
            }
            
            
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