(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('loading', loading);

    /** @ngInject */
    function loading($animate)
    {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            link    : function (scope, iElement, attrs, ctrl, transclude)
            {   console.log("load");
                iElement.addClass('hide');

                scope.$on('loading:true', function(event, message){
                    console.log("load1");
                    scope.message = message;
                    iElement.removeClass('hide');
                });

                scope.$on('loading:false', function(){
                    console.log("load2");
                    scope.message = '';
                    iElement.addClass('hide');
                });

                transclude(scope, function(clone, scope) {
                    iElement.append(clone);
                });
            }
        };
    }
})();