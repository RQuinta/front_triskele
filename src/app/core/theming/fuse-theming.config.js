(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config);

    /** @ngInject */
    function config($mdThemingProvider, fusePalettes, fuseThemes, fuseThemingProvider)
    {
        $mdThemingProvider.alwaysWatchTheme(true);

        // Define custom palettes
        angular.forEach(fusePalettes, function (palette)
        {
            $mdThemingProvider.definePalette(palette.name, palette.options);
        });

        // Register custom themes
        angular.forEach(fuseThemes, function (theme, themeName)
        {
            $mdThemingProvider.theme(themeName)
                .primaryPalette(theme.primary.name, theme.primary.options)
                .accentPalette(theme.accent.name, theme.accent.options)
                .warnPalette(theme.warn.name, theme.warn.options)
                .backgroundPalette(theme.background.name, theme.background.options);
        });

        // Store generated PALETTES and THEMES objects from $mdThemingProvider
        // in our custom provider, so we can inject them into other areas
        fuseThemingProvider.setRegisteredPalettes($mdThemingProvider._PALETTES);
        fuseThemingProvider.setRegisteredThemes($mdThemingProvider._THEMES);
    }
})();