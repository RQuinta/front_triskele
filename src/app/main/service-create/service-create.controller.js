(function ()
{
  'use strict';

  angular
  .module('app.service-create')
  .controller('ServiceCreateController', ServiceCreateController);

  /** @ngInject */
    function ServiceCreateController($scope, $rootScope, $location, $state, $anchorScroll, AuthService, CloudnaryService, $q, api, $mdToast)
    {
        var vm = this;

        // Data
        
        vm.newService = { sports: [], additionals: [], bring: [], included: [], not_included: [] };
        vm.cropper = {};
        vm.cropper.sourceImage = null;
        vm.cropper.croppedImage = null;
        vm.bounds = {};
        vm.bounds.left = 0;
        vm.bounds.right = 0;
        vm.bounds.top = 0;
        vm.bounds.bottom = 0;
        vm.width = window.innerWidth > 600 ? 500 : 275;
        vm.map = {center: {latitude: -22.9068, longitude: -43.1729}, zoom: 8 };
        vm.options = {
          scrollwheel: false
        };
    
        
        var events = {
          place_changed:function (searchBox) {
            var place = searchBox.getPlace();
            if (!place || place == 'undefined') {
              console.log('no place data :(');
                return;
            }

                    // refresh the map
                    vm.map = {
                      center:{
                        latitude:place.geometry.location.lat(),
                        longitude:place.geometry.location.lng()
                    },
                    zoom:14
                };

                    // refresh the marker
                    vm.marker = {
                      id:0,
                      options:{ draggable:true },
                      coords:{
                        latitude:place.geometry.location.lat(),
                        longitude:place.geometry.location.lng()
                    }
                };

            }
        };

        vm.searchbox = { template:'searchbox.tpl.html', events:events};
        vm.searchbox = {
          template:'searchbox.tpl.html',
          events:events,
          options:{
            autocomplete:true,
            }
        };
        
        vm.marker = {
          id: 0,
          coords: {
            latitude: -22.9068,
            longitude: -43.1729

        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {

              $log.log('marker dragend');

              var lat = marker.getPosition().lat();
              var lon = marker.getPosition().lng();
              $log.log(lat);
              $log.log(lon);

              vm.marker.options = {
                draggable: true,

                labelContent: "lat: " + vm.marker.coords.latitude + ' ' + 'lon: ' + vm.marker.coords.longitude,

                labelAnchor: "100 0",
                labelClass: "marker-labels"
            };
        }
        }
        };


        // Methods

        /*Menu do Card*/

        init();

        function init(){
            api.sport.index({}, function(resource) {
              vm.sports = resource;
            });
            api.city.index({}, function(resource) {
                vm.cities = resource;
            });
        };

        function createFilterFor(query) {
          var lowercaseQuery = _.lowerCase(query);

          return function filterFn(city) {
            return (_.lowerCase(city.name).indexOf(lowercaseQuery) === 0);
          };
        }

        vm.querySportSearch = function(query) {
          var results = query ? vm.sports.filter(createFilterFor(query)) : [];
          return results;
        }

        vm.queryCitySearch = function(query) {
          var results = query ? vm.cities.filter(createFilterFor(query)) : [];
          return results;
        }

        vm.addItemToList = function(list, item) {
            vm.newService[list].push(item);
            vm['new_' + list] = null;
        }

        function uploadImages(files) {
            return CloudnaryService.uploadFiles(files);
        };

        function uploadImage(file) {
            return CloudnaryService.uploadFile(vm.cropper.croppedImage);  
        };

        function toast(message) {
            $mdToast.show({
                    template : '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                    hideDelay: 6000,
                    position : 'top right',
                    parent   : '#content'
            });
        };

        vm.createService = function(){
            $rootScope.$broadcast('loading:true', 'Criando Serviço');
            var images = uploadImages(vm.files);
            vm.newService.professional_id = AuthService.getProfessional().id;
            vm.newService.sport_ids = _.map(vm.newService.sports, 'id' );
            vm.newService.city_id = vm.newService.city.id;
            vm.newService.latitude = vm.marker.coords.latitude;
            vm.newService.longitude = vm.marker.coords.longitude;            
            $q.all(images).then(function (images) {
               var cardImage = uploadImage(vm.cropper.croppedImage);
               vm.newService.service_pictures_attributes = _.map(images, function(value){
                   return { 'public_id': value.data.public_id };
               });
               cardImage.then(function (cardImage){
                    vm.newService.image = cardImage.data.public_id;
                    api.service.create({service: vm.newService}, function(resource) {
                        $rootScope.$broadcast('loading:false');
                        $state.go('app.me');
                    }, function() {
                        toast('Não foi possivel criar o serviço. Tente novamente em algumas momentos');
                    }.bind(vm)); 
               }.bind(vm));
            }.bind(vm));
        }.bind(vm);
        var originatorEv;

        vm.addAdditional = function(){
          vm.newService.additionals.push(vm.newAdditional);
          vm.newAdditional = {};
        };

        vm.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        vm.upload = uploadImage;
        vm.notificationsEnabled = true;

        vm.toggleNotifications = function() {
          vm.notificationsEnabled = !vm.notificationsEnabled;
        };

        vm.gotoTop = function() {
          $location.hash('top');
          $anchorScroll();
        };

    }
})();

