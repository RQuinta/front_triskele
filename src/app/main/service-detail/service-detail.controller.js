(function ()
{
    'use strict';

    angular
        .module('app.service-detail')
        .controller('ServiceDetailController', ServiceDetailController);

    /** @ngInject */
    function ServiceDetailController($state, api, AuthService, $pgCheckout, LanguagesService, uiGmapGoogleMapApi)
    {
        var vm = this;

        vm.images = [];

        // Data
        vm.mapOptions = {
            scrollwheel: false
        }
        vm.LanguagesService = LanguagesService;
        vm.makeAppointment = makeAppointment;
        vm.makeAcquisition = makeAcquisition;
        // Methods
        vm.hasRating = hasRating;

        vm.setRating = setRating;

        vm.getNumberOfComments = getNumberOfComments;

        init()

        function init() {
            api.service.show({ id: $state.params.service_id}, function(service) { 
                vm.service = service;
                vm.map = {
                    center : {
                        latitude: vm.service.latitude, 
                        longitude: vm.service.longitude
                    },
                    zoom : 14,
                    control : {}
                };
                vm.filteredAcquisitions = _.filter(vm.service.acquisitions, "rating");
                if (service.deleted || (!service.aproved) || (!service.active)) $state.go('app.pages_errors_error-404');
                vm.appointmentForm = { 'slots': 1 };
                vm.acquisitionForm = { 'slots': 1 };
            });
        };

        function makeAcquisition(){
            var totalPrice = ( ( ( vm.service.price + _.get(vm.acquisitionForm, 'additional.excess', 0) ) * vm.acquisitionForm.slots ) * 100); 
            var params = { "amount": totalPrice, "maxInstallments": 2 };
            $pgCheckout.open(params, function(data){
                console.log(data);
                var acquisition = { 
                    'payment_token': data.token,
                    'payment_method': data.payment_method,
                    'service_id': vm.service.id,
                    'additional_id': _.get(vm.acquisitionForm, 'additional.id'),
                    'slots': vm.acquisitionForm.slots, 
                    'base_price': vm.service.price,
                    'user_id': AuthService.getUser().id
                };
                api.acquisition.create({ 'acquisition': acquisition }, function(acquisition) {
                    vm.payment_success = true;
                }, function() {
                    $state.go('app.pages_errors_error-500');
                });
            });
        };

        function makeAppointment(){
            var appointment = { 
                'service_id': vm.service.id,
                'additional_id': _.get(vm.appointmentForm, 'additional.id'),
                'additional_price': _.get(vm.appointmentForm, 'additional.excess'),
                'slots': vm.appointmentForm.slots,
                'base_price': vm.service.price,
                'doubt': _.get(vm.appointmentForm, 'doubt', ''), 
                'daytime': vm.appointmentForm.daytime,
                'user_id': AuthService.getUser().id
            };
            api.appointment.create({ 'appointment': appointment }, function(appointment) {
                vm.appointment_success = true;
            }, function() {
                $state.go('app.pages_errors_error-500');
            });   
        };

        function setRating(rating) {
            vm.Rating = rating;
            vm.ratingSelected = true;
        };

        function hasRating(rating){
          return rating == vm.Rating;
        };

        function getNumberOfComments(acquisitions){
            vm.numberOfComments = 0;
            for (var i = 0; i < acquisitions.length - 1; i++) {
                if(acquisitions[i].commentary){
                    vm.numberOfComments++;
                }
            }
            return vm.numberOfComments;
        }

        uiGmapGoogleMapApi.then(function(maps) {

        });

    }
})();
