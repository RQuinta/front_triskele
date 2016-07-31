(function ()
{
    'use strict';

    angular
        .module('app.service-list')
        .controller('ServiceListController', ServiceListController);

    /** @ngInject */
    function ServiceListController($document, $mdDialog, $mdSidenav, searchService, $state, api, $rootScope, LanguagesService, $mdUtil)

    {

        var vm = this;

        vm.searchService = searchService;
        vm.LanguagesService = LanguagesService;

        vm.menuState = { adrenaline: false, rating: false  };

        /*Menu do Card*/

        var originatorEv;
        vm.openMenu = function($mdOpenMenu, ev) {
          originatorEv = ev;
          $mdOpenMenu(ev);
        };
        vm.notificationsEnabled = true;
        vm.hasMinRating = hasMinRating;
        vm.hasAdrenaline = hasAdrenaline;
        vm.hasPhysicalEffort = hasPhysicalEffort;
        vm.hasItem = hasItem;
        vm.toggleNotifications = function() {
          vm.notificationsEnabled = !vm.notificationsEnabled;
        };

        // Data

        // Methods
        vm.preventDefault = preventDefault;
        vm.toggleCompleted = toggleCompleted;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleFilter = toggleFilter;
        vm.serviceDetails = serviceDetails;
        vm.changeMenuState = changeMenuState;

        $rootScope.$on('$destroy', $mdUtil.enableScrolling);


        init();

        function init() {
          if ( vm.searchService.servicesListIsEmpty() ) {
            vm.searchService.selectedItemHandler();  
          }
          api.city.index({ only_active: true },
            function(resource) {
              vm.cities = resource;
            }, function() {
              console.log('b');
            });
          api.sport.index({ only_active: true },
            function(resource) {
              vm.sports = resource;
            }, function() {
              console.log('b');
            });
        };

        function hasMinRating(rating){
          return rating >= vm.searchService.filter.minRating;
        };

        function hasAdrenaline(adrenaline){
          return _.includes(vm.searchService.filter.adrenaline, adrenaline);
        };

        function hasPhysicalEffort(physicalEffort){
          return _.includes(vm.searchService.filter.physicalEffort, physicalEffort);
        };

        function hasItem(item){
          return _.includes(vm.searchService.selectedItens, item);
        };

        function changeMenuState(state){
          console.log(state);
          vm.menuState[state] = !vm.menuState[state];
        };


        function serviceDetails(service)
        {
          $state.go('app.service-detail', {'service_id': service.id});
        }
        

        /**
         * Prevent default
         *
         * @param e
         */
        function preventDefault(e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        /**
         * Toggle completed status of the task
         *
         * @param task
         * @param event
         */
        function toggleCompleted(task, event)
        {
            event.stopPropagation();
            task.completed = !task.completed;
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Toggles filter with true or false
         *
         * @param filter
         */
        function toggleFilter(filter)
        {
            vm.taskFilters[filter] = !vm.taskFilters[filter];

            checkFilters();
        }


    }
})();
