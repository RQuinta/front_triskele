(function ()
{
  'use strict';

   angular.module('fuse').service('LanguagesService', LanguagesService);

  /** @ngInject */
    function LanguagesService() {

        var vm = this;

        vm.getRating = function(rating) {
            switch (rating) {
                case 1:
                    return("DETAIL.BELOW_AVERAGE");
                case 2:
                    return("DETAIL.SATISFATORY");
                case 3:
                    return("DETAIL.GOOD");
                case 4:
                    return("DETAIL.VERY_GOOD");
                case 5:
                    return("DETAIL.EXCELLENT");
                default:
            }
        };

        vm.getActivity = function(sport) {
            switch (sport) {
                case 'Arvorismo':
                    return("DETAIL.TREETOP_ADVENTURE");
                case 'Balonismo':
                    return("DETAIL.BALLOONING");
                case 'Acquaride':
                    return("DETAIL.ACQUARIDE");
                case 'Trilha':
                    return("DETAIL.HIKING");
                case 'Canionismo':
                    return("DETAIL.CANYONING");
                case 'Cachoerismo':
                    return("DETAIL.WATERFALL_RAPELLING");
                case 'Canoagem':
                    return("DETAIL.CANOENING");
                case 'Passeio de Bicicleta':
                    return("DETAIL.BIKE_TOUR");
                case 'Escalada':
                    return("DETAIL.CLIMBING");
                case 'Espeleoturismo':
                    return("DETAIL.CAVING");
                case 'Flutuação':
                    return("DETAIL.SNORKELING");
                case 'Kitesurf':
                    return("DETAIL.KITEBOARDING");
                case 'Mergulho':
                    return("DETAIL.SKUBA_DIVING");
                case 'Observação da vida selvagem':
                    return("DETAIL.WILDLIFE_WATCHING");
                case 'Observação de Pássaros':
                    return("DETAIL.BIRDWATCHING");
                case 'Salto de Paraquedas':
                    return("DETAIL.SKYDIVING");
                case 'Passeio de Quadriciclo':
                    return("DETAIL.ATV_TOUR");
                case 'Rapel':
                    return("DETAIL.ABSEILING");
                case 'Stand Up Paddle':
                    return("DETAIL.STAND_UP_PADDLE");
                case 'Surf':
                    return("DETAIL.SURF");
                case 'Tirolesa':
                    return("DETAIL.ZIP_LINE");
                case 'Turismo Rural':
                    return("DETAIL.RURAL_TOURISM");
                case 'Passeio a Cavalo':
                    return("DETAIL.HORSEBACK_RIDING");
                case 'Off Road':
                    return("DETAIL.OFF_ROAD");
                case 'Buggy':
                    return("DETAIL.BUGGY");
                case 'Windsurf':
                    return("DETAIL.WINDSURF");
                case 'Skysurf':
                    return("DETAIL.SKYSURF");
                case 'Parapente':
                    return("DETAIL.PARAGLIDING");
                case 'Asa Delta':
                    return("DETAIL.HANG_GLIDING");
                case 'Trekking':
                    return("DETAIL.TREKKING");
                case 'Rafting':
                    return("DETAIL.RAFTING");
                default:
            }
        };

        vm.getLanguage = function(code) {
            switch (code) {
                case 'pt':
                    return("DETAIL.PORTUGUESE");
                case 'en':
                    return("DETAIL.ENGLISH");
                case 'es':
                    return("DETAIL.SPANISH");
                case 'fr':
                    return("DETAIL.FRENCH");
                case 'de':
                    return("DETAIL.GERMAN");
                case 'it':
                    return("DETAIL.ITALIAN");
                case 'ja':
                    return("DETAIL.JAPANESE");
                default:
            }
        };

    };

})();
