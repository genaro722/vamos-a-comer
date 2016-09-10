angular.module('app')
        .component('regMainComponent', {templateUrl: 'app/access/register.html', controller: registerCtrl})
//        .component('typeRegisterComponent', {templateUrl: 'app/components/access/pre-register.html', controller: registerCtrl});
        .component('typeRegister', {templateUrl: 'app/access/pre-register.html', controller: registerCtrl});

function registerCtrl($scope, $http, $state, $mdDialog, $timeout, $facebook, baseUrl) {
  var $ctrl = this;
  $ctrl.modal = {};
  $ctrl.authError = null;
  $ctrl.sending = false;

  $http.get("app/data/users.json").then(function (response) {
    $ctrl.tipos = response.data;
    console.log($ctrl.tipos);
  }, function () {

  });
  //        Funcion que se ejecuta cuando la respuesta del registro es exitosa
  var success = function (response) {
    var valid = response.data.valid;
    if (valid) {
      $ctrl.sending = false;
      $ctrl.loading = false;
      $ctrl.user = {};
      $ctrl.modal.title = "Bienvenido";
      $ctrl.modal.messages = [{mess: "Bienvenido a Pase.fit"}];
      $ctrl.open();
      $timeout(function () {
        $state.go("app.access.login");
      }, 1200);
    } else {
      console.log("invalid form");
      $ctrl.user = {};
    }
  };

  var error = function (reason) {
    $ctrl.sending = false;
    console.log("Error al registrar");
    console.log(reason);
    $ctrl.loading = false;
    $ctrl.user = {};
    $ctrl.modal.title = "Error";
    $ctrl.modal.messages = reason.data.errors;
    $ctrl.open("modal-sm");
  };

  $ctrl.register = function () {
    $ctrl.authError = null;
    console.log($ctrl.user.tipo);
    console.log("Registrando usuario");
//    if ($ctrl.tipoUsuario.send !== undefined) {
    if ($ctrl.tipoUsuario.send !== undefined) {
      if ($ctrl.user.email !== undefined && $ctrl.user.email !== " " &&
              $ctrl.user.plainPassword.first !== undefined && $ctrl.user.plainPassword.first !== "" && $ctrl.user.plainPassword.first !== " " &&
              $ctrl.user.plainPassword.second !== undefined && $ctrl.user.plainPassword.second !== "" && $ctrl.user.plainPassword.second !== " ") {
        $ctrl.loading = true;

        $ctrl.user.tipo = null;
        $ctrl.sending = true;
        var user = {
          username: $ctrl.user.email,
          plainPassword: {
            first: $ctrl.user.plainPassword.first,
            second: $ctrl.user.plainPassword.second
          },
          email: $ctrl.user.email,
          roles: [$ctrl.tipoUsuario.send]
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
        console.log($ctrl.user);
        $ctrl.loading = false;
      }
    } else {
      console.log("Sin rol asignado");
    }
  };

  $ctrl.tipoUsuario = {};

  $ctrl.tipoUsuario = JSON.parse(localStorage.getItem("pase.fit.storage-tipoUsuario"));
  $ctrl.user = {tipo: $ctrl.tipoUsuario};
  console.log($ctrl.tipoUsuario);

  $ctrl.elegirUsuario = function (number) {
    $ctrl.tipoUsuario = $ctrl.tipos[number];
    localStorage.setItem("pase.fit.storage-tipoUsuario", JSON.stringify($ctrl.tipoUsuario));
    $state.go('app.access.register');
  };

  $ctrl.open = function (ev) {
    console.log("Abrir modal");
    console.log($ctrl.modal);
    var mes = "";
    for (var i = 0; i < $ctrl.modal.messages.length; i++) {
      mes += $ctrl.modal.messages[i].mess + "\n";
    }
    $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title($ctrl.modal.title)
            .textContent(mes)
            .ariaLabel('Alert')
            .ok('ok')
//        .targetEvent(ev)
            );
  };

  $ctrl.facebookSingin = function () {
    $ctrl.sending = true;
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
