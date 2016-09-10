/** @ngInject */
angular.module('app').config(['$mdThemingProvider', '$mdIconProvider', themeConfig]);
function themeConfig($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
          .primaryPalette('deep-orange')
          .accentPalette('light-green')
          .warnPalette("teal");
}

