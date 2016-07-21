(function ()
{
    'use strict';

    angular
        .module('app.payment')
        .controller('PaymentController', PaymentController);

    /** @ngInject */
    function PaymentController(api, $state, $pgCheckout)
    {
        var vm = this;

        vm.paymentDetails = false;
        
        // Data

        // Methods
        
        init()
        vm.makePayment = makePayment;

        function init() {
            api.appointment.show({ token: $state.params.token}, function(appointment) {
                vm.appointment = appointment;
            }, function() {
                console.log('b');
            });
        };

        function makePayment(){
            var totalPrice = ( ( ( vm.appointment.base_price + _.get(vm.appointment, 'additional_price', 0) ) * vm.appointment.slots ) * 100); 
            var params = { "amount": totalPrice, "maxInstallments": 2 };
            $pgCheckout.open(params, function(data){
                console.log(data);
                var acquisition = { 
                    'payment_token': data.token,
                    'payment_method': data.payment_method,
                    'service_id': vm.appointment.service.id,
                    'additional_id': _.get(vm.appointment, 'additional.id', null),
                    'slots': vm.appointment.slots, 
                    'base_price': vm.appointment.base_price,
                    'user_id': vm.appointment.user.id
                };
                api.acquisition.create({ 'acquisition': acquisition }, function(acquisition) {
                    vm.payment_success = true;
                }, function() {
                    vm.payment_error = true;
                });
            });
        }

    }
})();