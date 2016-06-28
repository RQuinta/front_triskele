(function ()
{
  'use strict';

   angular.module('fuse').service('AuthService', AuthService);

  /** @ngInject */
    function AuthService($rootScope, api, $facebook, $window, $state, $localStorage, CloudnaryService) {

        var vm = this;

        vm.getUser = function () {
            return $localStorage.user;
        };

        vm.isProfessional = function(){
            return angular.isDefined($localStorage.user) && angular.isDefined($localStorage.user.professional);
        };

        vm.isLogged = function(){
            return angular.isDefined($localStorage.user);
        };

        vm.getProfessional = function () {
            return $localStorage.user.professional;
        };

        vm.getUserToken = function () {
            return $localStorage.userToken;
        };

        vm.setUser = function (user) {
            $localStorage.userToken = user.token;
            $localStorage.user = user;
            $rootScope.$broadcast('permissionsChanged');
        };

        vm.unsetToken = function () {
            $localStorage.$reset();
            $rootScope.$broadcast('permissionsChanged');
            $state.go('app.sample');
        };

        vm.apiLogin = function(credencials){
            api.session.create({ session: credencials, social_login: false}, function(session){
                vm.setUser(session);
                $window.history.back();
            }, function() {
                console.log('nao foi');
            });  
        };

        vm.apiUserCreate = function(credencials){
            api.user.create({user: credencials}, function(user){
                vm.setUser(user);
                $window.history.back();
            });  
        };

        vm.facebookLogin = function() {
            $facebook.login().then(function(a) {
                $facebook.api('/me?fields=id,name,email, picture').then(function(fb_user) {
                    console.log('fb_user', fb_user);
                    api.session.create({session: {email: fb_user.email, social_login: true}}, function(session){
                        vm.setUser(session);
                        $window.history.back();
                    }, function(error) {
                        if (error.status === 404) {
                            vm.apiUserCreate({email: fb_user.email, name: fb_user.name });
                        };
                    });
                });
            });
        };

    };

    angular.module('fuse').factory('authorizationInterceptor', function authorizationInterceptor($localStorage) {
        return {
            'request' : function (config) {
                if ($localStorage.userToken && _.includes(_.words(config.url), 'triskele') ){
                  config.headers.AUTHORIZATION = 'Token '+ 'token='+ $localStorage.userToken;
                } 
                return config;
            }
        };
    });

    angular.module('fuse').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authorizationInterceptor');
    });

})();
