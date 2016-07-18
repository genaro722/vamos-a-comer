//module.exports = {
//   templateUrl: 'app/containers/access/login.html',
//   controller: loginCtrl
//};

angular.module('app').component('login',{templateUrl: 'app/containers/access/login.html',
   controller: loginCtrl});
//angular
//  .module('app').controller('loginCtrl',['$http','$state','$window','jwtHelper','$modal','$facebook','baseUrl',loginCtrl]);

function loginCtrl($http, $state, $window, jwtHelper, $facebook, baseUrl) {
   console.log("Hola login");
   var $scope = this;
   $scope.modal = {};
   $scope.user = {};
   $scope.authError = null;

   var success = function (response) {
      var cred = jwtHelper.decodeToken(response.data.token);
      var pro = JSON.stringify(response.data.data.profiles_iri);
      localStorage.setItem("pase.fit.storage-profiles_iri", pro);
      localStorage.setItem("pase.fit.storage-token", response.data.token);
      localStorage.setItem("pase.fit.storage-username", response.data.data.username);
      localStorage.setItem("pase.fit.storage-user_iri", response.data.data.user_iri);
      localStorage.setItem("pase.fit.storage-roles", JSON.stringify(response.data.data.roles));
      $window.location.hash = "#/pase-fit/dashboard";
   };

   var error = function (response) {
      $scope.sending = false;
      console.log("Error de inicio de sesión");
      console.log(response.data);
      $scope.modal.title = "Error";
      $scope.modal.messages = [{mess: response.data.message}];
      $scope.open("modal-sm");
   };

   $scope.login = function () {
      $scope.authError = null;
      $scope.sending = true;
      var config = {method: 'POST',
//                url: "http://api.pase.fit/api/login_check",
         url: baseUrl.url + "api/login_check",
         skipAuthorization: true,
         data: $scope.user};
      console.log(config);
      $http(config).then(success, error);
   };



   $scope.open = function (size, windowClass) {
      var modalInstance = $modal.open({
         templateUrl: 'angular/partials/pase-fit/modal-info.html',
         controller: 'ModalInfoCtrl',
         windowClass: windowClass,
         size: size,
         resolve: {
            modal: function () {
               return $scope.modal;
            }
         }
      });

      modalInstance.result.then(function (selectedItem) {
         $scope.selected = selectedItem;
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };

   $scope.facebookSingin = function () {
      $scope.sending = true;
      console.log("Login facebook");
      $facebook.login().then(function success(response) {
         console.log("Exito");
         console.log(response);
         $facebook.api("/me", {fields: 'first_name,last_name,email,gender,locale,picture'}).then(function success(response) {
            console.log(response);
         }, function error(response) {
            console.log(response);
         });
      }, function error(response) {
         console.log("error");
         console.log(response);
      });
   };

}
