(function ()
{
    'use strict';

    angular.module('fuse')
        .directive('msCard', msCardDirective);

    /** @ngInject */
    function msCardDirective()
    {
        return {
            restrict: 'AE',
            scope   : {
                template: '=',
                card    : '=ngModel'
            },
            template: '<div class="ms-card-content-wrapper" ng-include="templateDir" onload="cardTemplateLoaded()"></div>',
            compile : function (tElement)
            {
                // Add class
                tElement.addClass('ms-card');

                return function postLink(scope, iElement)
                {
                    var baseDir = 'app/core/directives/ms-card/templates/';
                    scope.templateDir = baseDir + scope.template + '/' + scope.template + '.html';

                    // Add template name as a class
                    iElement.addClass(scope.template);

                    // Methods
                    scope.cardTemplateLoaded = cardTemplateLoaded;

                    //////////

                    /**
                     * Emit cardTemplateLoaded event
                     */
                    function cardTemplateLoaded()
                    {
                        scope.$emit('msCard::cardTemplateLoaded', iElement);
                    }
                };
            }
        };
    }
})();