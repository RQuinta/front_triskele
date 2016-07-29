(function ()
{
  'use strict';

  angular
  .module('fuse')
  .factory('api', apiService);

  /** @ngInject */
  function apiService($resource)
  {
      var api = {};

      // Base Url

      //api.baseUrl = 'https://afternoon-everglades-99638.herokuapp.com/';
      api.baseUrl = 'http://development.triskele.me:4000';

      api.city = $resource(api.baseUrl + "/api/cities/:id.json", { id: '@id' }, {
         'index':   { 
            'method': 'GET',
            'isArray': true, 
            'transformResponse' : function (data, __, status) {
               if (status !== 200) return [];
               var cities = angular.fromJson(data);
               _.forEach(cities, function (city) {
                  city.type = "City"
               });
               return _.sortBy(cities, 'name'); 
            }  
         }
      });

      api.professional = $resource(api.baseUrl + "/api/professionals/:id.json", { id: '@id' }, {
         index:   { method: 'GET', isArray: true },
         create:  { method: 'POST' },
         update:  { method: 'PUT' },
         show:    { method: 'GET' }
      });

      api.doubts = $resource(api.baseUrl + "/api/doubts/.json", { id: '@id' }, {
         create:  { method: 'POST' }
      });

      api.service_changes = $resource(api.baseUrl + "/api/service_changes/.json", { id: '@id' }, {
         create:  { method: 'POST' }
      });

      api.service =  $resource(api.baseUrl + "/api/services/:id.json", { id: '@id' }, {
        index:   { method: 'GET', isArray: true },
        create:  { method: 'POST', 
            'transformRequest' : function(data){
                _.forEach(['bring', 'included', 'not_included'], function (key) {
                    data.service[key] = _.join(data.service[key], '<‡>');
                });
                return angular.toJson(data);
            } 
        },
        update:  { method: 'PUT' },
        delete:  { method: 'DELETE'},
        show:    { method: 'GET', 
          'transformResponse' : function (data, __, status) {
            if (status !== 200) return {};
              var service = angular.fromJson(data);
              _.forEach(['bring', 'included', 'not_included'], function (key) {
                  service[key] = _.split( service[key] , '<‡>');
              });
               _.forEach(service.service_pictures, function (picture) {
                  picture.img = 'http://res.cloudinary.com/dwpckwhch/image/upload/q_80/' + picture.public_id + '.jpg';
                  picture.thumb = 'http://res.cloudinary.com/dwpckwhch/image/upload/q_80/' + picture.public_id + '.jpg';
               });
              return service;
            } 
          }
      });

      api.sport = $resource(api.baseUrl + "/api/sports/:id.json", { id: '@id' }, {
         'index':   { 
            'method': 'GET',
            'isArray': true, 
            'transformResponse' : function (data, __, status) {
               if (status !== 200) return [];
               var sports = angular.fromJson(data);
               _.forEach(sports, function (city) {
                  city.type = "Sport"
               });
               return _.sortBy(sports, 'name'); 
            }  
         }
      });

      api.appointment = $resource(api.baseUrl + "/api/appointments/:id.json", { id: '@id', token: '@token' }, {
         index:   { method: 'GET', isArray: true },
         create:  { method: 'POST' },
         update:  { method: 'PUT' },
         show:    { method: 'GET' , url: api.baseUrl + "/api/appointments/:token.json"}
      });

      api.acquisition = $resource(api.baseUrl + "/api/acquisitions/:id.json", { id: '@id', token: '@token' }, {
         index:   { method: 'GET', isArray: true },
         create:  { method: 'POST' },
         update:  { method: 'PUT' },
         show:    { method: 'GET', url: api.baseUrl + "/api/acquisitions/:token.json"}
      }); 

      api.state =  $resource(api.baseUrl + "/api/states/:id.json", { id: '@id' }, {
         index:   { method: 'GET', isArray: true }
      });

      api.user =  $resource(api.baseUrl + "/api/users/:id.json", { id: '@id', email: '@email' }, {
         index:   { method: 'GET', isArray: true },
         create:  { method: 'POST' },
         forget_password: { method: 'POST', url: api.baseUrl + "/api/users/forget_password.json" },
         show_by_token: { method: 'GET', url: api.baseUrl + "/api/users/show_by_token/:token.json" },
         update:  { method: 'PUT' },
         show:    { method: 'GET' }
      });

      api.session = $resource(api.baseUrl + "/api/sessions/:id.json", { id: '@id' }, {
         create:  { method: 'POST' }
      });

      return api;
     }

  })();