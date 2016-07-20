angular
        .module('app')
        .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/access/login');

  $stateProvider
          .state('app', {
            url: '/',
            template: '<app></app>'
          })
          .state('app.access', {
            url: 'access',
            template: '<ui-view></ui-view>'
          })
          .state('app.access.login', {
            url: '/login',
            template: '<login-component></login-component>'
          })
          .state('app.access.register', {
            url: '/register',
            template: '<reg-main-component></reg-main-component>'
          })
          .state('app.access.pre-register', {
            url: '/pre-register',
            template: '<type-register-component></type-register-component>'
          })
          .state('app.access.resetPwd', {
            url: '/resetPwd',
            template: '<reset-pwd-component></user-register-component>'
          })
          .state('app.access.forgotPwd', {
            url: '/forgotPwd',
            template: '<forgot-pwd-component></user-register-component>'
          })
          .state('app.inside', {
            url: 'pase-fit',
            template: '<main-component></main-component>'
          })
          .state('app.inside.dashboard', {
            url: '/dashboard',
            template: '<dashboard></dashboard>'
          })
          .state('app.inside.estudio-perfil', {
            url: '/perfil-estudio',
            template: '<perfil-estudio></perfil-estudio>',
            resolve: {
              deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                  return $ocLazyLoad.load('app/factory/clientFactory.js');
                }
              ]
            }
          })
          ;
}
