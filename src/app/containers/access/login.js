angular.module('app').component('loginComponent', {templateUrl: 'app/containers/access/login.html',
  controller: loginCtrl});

function loginCtrl($scope, $http, $state, $window, jwtHelper, $facebook, baseUrl, $mdDialog) {
  console.log("Hola login");
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
//    $window.location.hash = "#/pase-fit/dashboard";
    $state.go("app.inside.dashboard");
  };

  var error = function (response) {
    $scope.sending = false;
    console.log("Error de inicio de sesión");
    console.log(response.data);
    $scope.modal.title = "Error";
    $scope.modal.messages = [{mess: response.data.message}];
    $scope.open();
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

  $scope.open = function (ev) {
    console.log("Abrir modal");
    console.log($scope.modal);
    var mes = "";
    for (var i = 0; i < $scope.modal.messages.length; i++) {
      mes += $scope.modal.messages[i].mess + "\n";
    }
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title($scope.modal.title)
        .textContent(mes)
        .ariaLabel('Alert')
        .ok('ok')
//        .targetEvent(ev)
    );
  };
}
