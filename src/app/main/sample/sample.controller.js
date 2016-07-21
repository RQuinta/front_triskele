(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(searchService)
    {
        var vm = this;

        // Data
        vm.searchService = searchService;
        vm.screenWidth = window.innerWidth;

        //the offsetTop top space for headers

		vm.slides = [
	        'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
	        'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
	        'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
	        'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
	      ];
		

        // Methods

        function init(){
          vm.searchService.filterClear();
        }

        function getPlaceholder(){
          if(vm.screenWidth < 600){
            return 'Ex: Rafting';
          }
          else {
            return 'Entre com Esporte ou Cidade';
          }
        }

        init();
        //////////
    }
})();
