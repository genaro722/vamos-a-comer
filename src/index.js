angular
  .module('app', ['ui.router', 'ngMaterial', 'ngAnimate', 'angular-jwt', 'restangular', 'ngFacebook', "oc.lazyLoad"])
  .service('todoService', TodoService);
