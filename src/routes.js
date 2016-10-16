angular
        .module('app')
        .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
//  $locationProvider.html5Mode(true).hashPrefix('!');
//  $urlRouterProvider.otherwise('/access/login');
  $urlRouterProvider.otherwise('/principal');

  $stateProvider
          .state('app', {
            url: '/',
            template: '<app></app>'
          })
          .state('app.access', {
//            url: 'access',
            abstract: true,
            template: '<access></access>'
          })
          .state('app.access.login', {
            url: 'login',
//            template: '<login-component></login-component>'
            template: '<login></login>'
//            component: 'login'
          })
          .state('app.access.login1', {
            url: 'login1',
            template: '<login1></login1>'
          })
          .state('app.access.principal', {
            url: 'principal',
            template: '<principal></principal>'
          })
          .state('app.access.register', {
            url: 'register',
            template: '<reg-main-component></reg-main-component>'
          })
          .state('app.access.pre-register', {
            url: 'pre-register',
//            template: '<type-register-component></type-register-component>'
            template: '<type-register></type-register>'
          })
          .state('app.access.resetPwd', {
            url: 'resetPwd',
            template: '<reset-pwd-component></user-register-component>'
          })
          .state('app.access.forgotPwd', {
            url: 'forgotPwd',
            template: '<forgot-pwd-component></user-register-component>'
          })
          .state('app.inside', {
//            url: 'main',
            abstract: true,
            template: '<main-component></main-component>'
          })
          .state('app.inside.cliente', {
            url: 'cliente',
            template: '<main-search flex></main-search>'
          })
          .state('app.inside.restaurante', {
            url: 'restaurante',
            template: '<dashboard-restaurante></dashboard-restaurante>'
          })
          .state('app.inside.ventas', {
            url: 'ventasRestaurante',
            template: '<ventas-restaurante></ventas-restaurante>'
          })
          .state('app.inside.contactanos', {
            url: 'contactanos',
            template: '<contactanos></contactanos>'
          })
          ;
}
