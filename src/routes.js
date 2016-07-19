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
//    .state('app.login', {
//      url: 'login',
//      template: '<login></login>'
//    })
    .state('app.access', {
      url: 'access',
      template: '<ui-view></ui-view>'
    })
    .state('app.access.login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('app.access.register', {
      url: '/register',
      template: '<register-component></register-component>'
    })
    .state('app.access.register', {
      url: '/pre-register',
      template: '<pre-register-component></pre-register-component>'
    })
    .state('app.inside', {
      url: 'pase-fit',
      template: '<main-component></main-component>'
    })
    .state('app.inside.dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    })
    ;
}
