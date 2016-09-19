angular
  .module('app', ['ui.router',
   'ngMaterial',
   'ngAnimate',
   'ngMessages',
   'angular-jwt', 
   'restangular',
   'ngFacebook',
   "oc.lazyLoad",
   'angular-tour',
   'uiGmapgoogle-maps'])
  .service('todoService', TodoService);
