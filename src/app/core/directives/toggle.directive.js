(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('menuCheck', menuCheck);

    /** @ngInject */
    function menuCheck($rootScope, searchService)
    {
        return {
            restrict: 'A',
            scope: { 
                item: '='
            },
            link: function(scope, element, attrs) {

                if ( _.find(searchService.selectedItens, _.pick(scope.item, ['type', 'id'])) ) {
                    scope.clicked = true;    
                    element.addClass(attrs.clickedClass);      
                }
                
                var listener = $rootScope.$on('selectedItemHandler', function(event, item){
                    if (angular.isDefined(item) && angular.isDefined(scope.item)){ 
                        var result = _.isEqualWith(scope.item, item, function(item, anotherItem){
                            return ( (item.id === anotherItem.id) && (item.name === anotherItem.name));  
                        });
                        if (result) {
                            scope.clicked = !scope.clicked;    
                            if (scope.clicked){ 
                                element.addClass(attrs.clickedClass);
                            }
                            else {
                                element.removeClass(attrs.clickedClass);  
                            }      
                        }
                    } 
                });

                scope.$on('$destroy', function(){
                    listener();
                });
 
            }     
        };
    }
})();
