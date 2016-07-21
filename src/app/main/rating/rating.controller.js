(function ()
{
    'use strict';

    angular
        .module('app.rating')
        .controller('RatingController', RatingController);

    /** @ngInject */
    function RatingController($state, api)
    {
        var vm = this;
        
        // Data

        // Methods
        
        init()
        vm.setAcquisitionRating = setAcquisitionRating;
        vm.save = save;

        function init() {
            api.acquisition.show({ token: $state.params.token}, function(acquisition) {
                vm.acquisition = acquisition;
            }, function() {
                console.log('b');
            });
        };

        function save(){
            api.acquisition.update({ id: vm.acquisition.id, acquisition: vm.acquisition }, function(acquisition){
                vm.success = true;
            }, function() {
                vm.error = true;
            });
        }

        function setAcquisitionRating(rating) {
            vm.acquisition.rating = rating;
        }


    }
})();

