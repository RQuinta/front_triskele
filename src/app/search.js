(function ()
{
  'use strict';

  angular
  .module('fuse')
  .service('searchService', searchService);

  /** @ngInject */
  function searchService($q, api, $timeout, $state, $rootScope, $mdUtil) {

      var vm = this;

      vm.itens = [];
      vm.selectedItens = [];
      vm.servicesList = [];
      vm.filteredServiceList = [];
      vm.orderOption = { id: 1, key: 'sales_counter', order: 'desc' };
      vm.filter = { minRating: 1, highPriceUntouched: true, physicalEffort: [1,2,3,4,5], adrenaline: [1,2,3,4,5] };

      vm.setHighPriceTouched = function(){
        vm.filter.highPriceUntouched = false;
      };

      vm.orderChanged = function(){
        vm.filterResults(vm.servicesList);
      };

      vm.servicesListIsEmpty = function(){
        return vm.servicesList.length === 0; 
      };

      vm.addItemHandler = function(item){
        if (_.includes(vm.selectedItens, item)){
          _.remove(vm.selectedItens, item);
        }
        else{
          vm.selectedItens.push(item);
        }
         vm.selectedItemHandler(item);  
      };

      $rootScope.$on('$destroy', $mdUtil.enableScrolling);

      vm.selectedItemHandler = function (item){
          vm.itens = [];
          $rootScope.$broadcast('selectedItemHandler', item);
          var groupedSelectedItens = _.groupBy(vm.selectedItens, 'type');
          if ( _.keys(groupedSelectedItens).length === 0 ) {
            searchWithoutParams();
          }
          else{
            searchWithParams(groupedSelectedItens);
          }
          $state.go('app.service-list');
      }.bind(vm);

      vm.filterResults = function(servicesList){
         var list =  filterByPhysicalEffort(filterByAdrenaline(filterByRating(servicesList)));
          updatePriceFilter(list);
          vm.filteredServiceList = _.orderBy(filterByPrice(list), [vm.orderOption.key], [vm.orderOption.order]);
      };

      function filterByPhysicalEffort(servicesList){
        return _.filter(servicesList, function(service){
          return _.includes(vm.filter.physicalEffort, service.physical_effort);
        });
      };

      function filterByAdrenaline(servicesList){
        return _.filter(servicesList, function(service){
          return _.includes(vm.filter.adrenaline, service.adrenaline);
        });
      };

      function filterByRating(servicesList){
        return _.filter(servicesList, function(service){
          return ((service.rating >= vm.filter.minRating) || service.rating === 0 ) ;
        });
      };

      function filterByPrice(servicesList){
        return _.filter(servicesList, function(service){
          return service.price <= vm.filter.highPrice || angular.isUndefined(vm.filter.highPrice);
        });

      };

      function updatePriceFilter(list){
        var allPrices = _.map(list, 'price');
        vm.filter.higherPrice = _.max(allPrices); 
        vm.filter.lowestPrice = _.min(allPrices);
        if (vm.filter.highPriceUntouched) vm.filter.highPrice = vm.filter.higherPrice;
      }

      vm.setMinRating = function(rating) {
        vm.filter.minRating = rating;
        vm.filterResults(vm.servicesList);
      };

      vm.handleAdrenaline = function(adrenaline){
        if (_.includes(vm.filter.adrenaline, adrenaline)){
          if (vm.filter.adrenaline.length === 1){
            vm.filter.adrenaline = _.union(vm.filter.adrenaline, [1, 2, 3, 4, 5]);
          }
          else{
            _.remove(vm.filter.adrenaline, function(adr){
              return adr === adrenaline
            });
          }
        }
        else{
          vm.filter.adrenaline.push(adrenaline);
        }
        vm.filterResults(vm.servicesList);
      }

      vm.handlePhysicalEffort = function(physicalEffort){
        if (_.includes(vm.filter.physicalEffort, physicalEffort)){
          if (vm.filter.physicalEffort.length === 1 ){ 
            vm.filter.physicalEffort = _.union(vm.filter.physicalEffort, [1, 2, 3, 4, 5]);
          }
          else{
            _.remove(vm.filter.physicalEffort, function(phy){
              return phy === physicalEffort
            });
          }
        }
        else{ 
          vm.filter.physicalEffort.push(physicalEffort);
        }
        vm.filterResults(vm.servicesList);
      }

      function searchWithoutParams(){
          api.service.index({ without_deleted: true, only_active: true, only_aproved: true } , function(resource) {
              vm.servicesList = resource;
              vm.filterResults(vm.servicesList);
          }, function() {
            console.log('b');
          });
       };

       function searchWithParams(groupedSelectedItens) {
          if ( _.has(groupedSelectedItens, 'City') && (!_.has(groupedSelectedItens, 'Sport') ) ) {
             _.forEach(groupedSelectedItens['City'], function(city) {
                api.service.index({ 
                  by_city: city.id, without_deleted: true, only_active: true, only_aproved: true 
                }, function(resource) {
                    vm.servicesList = resource;
                    vm.filterResults(vm.servicesList);
                }, function() {
                    console.log('b');
                });
             });
          }
          else{
             if ( ( !_.has(groupedSelectedItens, 'City') ) && _.has(groupedSelectedItens, 'Sport') ){
                _.forEach(groupedSelectedItens['Sport'], function(sport) {
                  api.service.index({
                      by_sport: sport.id, without_deleted: true, only_active: true, only_aproved: true
                }, function(resource) {
                      vm.servicesList = resource;
                      vm.filterResults(vm.servicesList);
                   }, function() {
                      console.log('b');
                   });
                });
             }
             else{
                _.forEach(groupedSelectedItens['City'], function(city) {
                   _.forEach(groupedSelectedItens['Sport'], function(sport) {
                      api.service.index({
                         by_city: city.id, by_sport: sport.id, without_deleted: true, only_active: true, only_aproved: true
                      }, function(resource) {
                         vm.servicesList.concat(resource);
                         vm.filterResults(vm.servicesList);
                      }, function() {
                         console.log('b');
                      });

                   });
                });
             }
          }
       };

       vm.searchTextHandler = function(searchText){
          if (searchText === '') return
          $q.all([ api.sport.index( { by_name : vm.searchText, only_active: true }).$promise, api.city.index( { by_name : vm.searchText, only_active: true } ).$promise ]).then( _.spread(function (sports, cities) {
             vm.itens = [];
             vm.itens = _.concat(cities,sports);
             $timeout( {}, 0);
          }.bind(vm)));
       };

      vm.filterClear = function(){
        vm.itens = [];
        vm.selectedItens = [];
        vm.servicesList = [];
        vm.filter.highPriceUntouched = true;
        vm.filter = { minRating: 1, physicalEffort: [1,2,3,4,5], adrenaline: [1,2,3,4,5] };
        searchWithoutParams();
      };
   }

  })();
