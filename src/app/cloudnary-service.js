(function ()
{
  'use strict';

  angular
  .module('fuse')
  .service('CloudnaryService', CloudnaryService);

  /** @ngInject */
    function CloudnaryService(Upload, cloudinary) {

        var vm = this;

        vm.uploadFile = function(file){
            if (!file || file.error) return;
            var promise = Upload.upload({
                url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                data: {
                    upload_preset: cloudinary.config().upload_preset,
                    tags: 'myphotoalbum',
                    context: 'photo=',
                    file: file
                }
            }).progress(function (e) {
                file.progress = Math.round((e.loaded * 100.0) / e.total);
                file.status = "Carregando... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
                console.log('data', data);
                data.context = {custom: {photo: 'blalbal'}};
                file.result = data;
            }).error(function (data, status, headers, config) {
                    file.result = data;
            });
            return promise;
        };
        
        vm.uploadFiles = function(files){
            if (!files) return;
            var promises = [];
            angular.forEach(files, function(file){
                if (file && !file.$error) {
                var promise = Upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                    data: {
                        upload_preset: cloudinary.config().upload_preset,
                        tags: 'myphotoalbum',
                        context: 'photo=',
                        file: file
                    }
                }).progress(function (e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = "Carregando... " + file.progress + "%";
                }).success(function (data, status, headers, config) {
                    console.log('data', data);
                    data.context = {custom: {photo: 'blalbal'}};
                    file.result = data;
                }).error(function (data, status, headers, config) {
                        file.result = data;
                    });
                }
                promises.push(promise);
            });
            return promises;
        };

    };
})();
