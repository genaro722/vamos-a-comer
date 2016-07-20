angular.module('app')
        .component('regMainComponent', {templateUrl: 'app/containers/access/register.html', controller: registerCtrl})
        .component('typeRegisterComponent', {templateUrl: 'app/containers/access/pre-register.html', controller: registerCtrl});

function registerCtrl($scope, $http, $state, $mdDialog, $log, $window, $timeout, $facebook, baseUrl) {
  $scope.modal = {};
  $scope.authError = null;
  $scope.sending = false;

  $http.get("app/data/users.json").then(function (response) {
    $scope.tipos = response.data;
  }, function () {

  });
  //        Funcion que se ejecuta cuando la respuesta del registro es exitosa
  var success = function (response) {
    var valid = response.data.valid;
    if (valid) {
      $scope.sending = false;
      $scope.loading = false;
      $scope.user = {};
      $scope.modal.title = "Bienvenido";
      $scope.modal.messages = [{mess: "Bienvenido a Pase.fit"}];
      $scope.open();
      $timeout(function () {
        $state.go("app.access.login");
      }, 1200);
    } else {
      console.log("invalid form");
      $scope.user = {};
    }
  };

  var error = function (reason) {
    $scope.sending = false;
    console.log("Error al registrar");
    console.log(reason);
    $scope.loading = false;
    $scope.user = {};
    $scope.modal.title = "Error";
    $scope.modal.messages = reason.data.errors;
    $scope.open("modal-sm");
  };

  $scope.register = function () {
    $scope.authError = null;
    console.log($scope.user.tipo);
    console.log("Registrando usuario");
//    if ($scope.tipoUsuario.send !== undefined) {
    if ($scope.tipoUsuario.send !== undefined) {
      if ($scope.user.email !== undefined && $scope.user.email !== " " &&
              $scope.user.plainPassword.first !== undefined && $scope.user.plainPassword.first !== "" && $scope.user.plainPassword.first !== " " &&
              $scope.user.plainPassword.second !== undefined && $scope.user.plainPassword.second !== "" && $scope.user.plainPassword.second !== " ") {
        $scope.loading = true;

        $scope.user.tipo = null;
        $scope.sending = true;
        var user = {
          username: $scope.user.email,
          plainPassword: {
            first: $scope.user.plainPassword.first,
            second: $scope.user.plainPassword.second
          },
          email: $scope.user.email,
          roles: [$scope.tipoUsuario.send]
        };
        var formData = {
          fos_user_registration_form: user
        };

        console.log();
//                    skipAuthorization: true,
        var config = {method: 'POST',
          url: baseUrl.url + "register/",
          skipAuthorization: true,
          data: $.param(formData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        console.log(config);
        $http(config).then(success, error);
      } else {
        console.log("Faltan datos");
        console.log($scope.user);
        $scope.loading = false;
      }
    } else {
      console.log("Sin rol asignado");
    }
  };

  $scope.tipoUsuario = {};

  $scope.tipoUsuario = JSON.parse(localStorage.getItem("pase.fit.storage-tipoUsuario"));
  $scope.user = {tipo: $scope.tipoUsuario};
  console.log($scope.tipoUsuario);

  $scope.elegirUsuario = function (number) {
    $scope.tipoUsuario = $scope.tipos[number];
    localStorage.setItem("pase.fit.storage-tipoUsuario", JSON.stringify($scope.tipoUsuario));
    $state.go('app.access.register');
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
