angular
        .module('app')
        .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
//  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/access/login');

  $stateProvider
          .state('app', {
            url: '/',
            template: '<app></app>'
          })
          .state('app.access', {
            url: 'access',
            template: '<access></access>'
          })
          .state('app.access.login', {
            url: '/login',
//            template: '<login-component></login-component>'
            template: '<login></login>'
//            component: 'login'
          })
          .state('app.access.login1', {
            url: '/login1',
//            template: '<login-component></login-component>'
            template: '<login1></login1>'
//            component: 'login'
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
          .state('app.inside.studio-profile', {
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
