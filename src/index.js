angular
  .module('app', ['ui.router', 'ngMaterial', 'ngAnimate', 'angular-jwt', 'restangular', 'ngFacebook'])
  .service('todoService', TodoService);
