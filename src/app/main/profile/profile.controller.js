(function ()
{
  'use strict';

  angular
  .module('app.profile')
  .controller('ProfileController', ProfileController);

  /** @ngInject */
    function ProfileController($scope, $state, AuthService, api, $mdToast)
    {
        var vm = this;

        // Data
        api.user.show({ id: $state.params.id}, function(profile) {
            vm.profile = profile;
            vm.backgroundImage = "http://res.cloudinary.com/dwpckwhch/image/upload/q_80/" + vm.profile.background_image + ".jpg";
            if (profile.professional) {
                api.service.index({ by_professional: profile.id, with_city: true }, function(services) {
                    vm.servicesList = services;
                }, function() {
                    console.log('b');
                });
            }
        }, function() {
            console.log('b');
        });


        
        // Methods


    }
})();
