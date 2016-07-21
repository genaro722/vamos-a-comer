angular
  .module('app', ['ui.router', 'ngMaterial', 'ngAnimate', 'angular-jwt', 'restangular', 'ngFacebook', "oc.lazyLoad", 'uiGmapgoogle-maps'])
  .service('todoService', TodoService);
