/** @ngInject */
angular.module('app').config(['$mdThemingProvider', '$mdIconProvider', themeConfig]);
function themeConfig($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
          .primaryPalette('deeporange')
          .accentPalette('light-green')
          .warnPalette("teal");
}

