angular
        .module('app')
        .component('mainComponent', {
          templateUrl: 'app/containers/main.html',
          controller: mainCtrl
        });

function mainCtrl($rootScope, $scope, $state, jwtHelper, Restangular) {
  function comprobarSesion(toState) {
    console.log("Comprobando sesión");
    if (toState === "access.login" ||
            toState === "app.access.register" ||
            toState === "app.access.registerForm" ||
            toState === 'app.access.forgotPwd' ||
            toState === "app.access.resetPwd") {
      console.log("No redirigir");
    } else {
//                Esto esta comentado hasta q se genere el token de verdad
      var token = localStorage.getItem("pase.fit.storage-token");
      if (token !== undefined && token !== null) {
        console.log("1");
        if (jwtHelper.isTokenExpired(token) === true) {
          localStorage.clear();
          $state.go('access.login');
        } else {
          console.log("todo bien, continuar");
        }
      } else {
        console.log("2");
        $state.go('access.login');
      }
    }
  }

  $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
    comprobarSesion(toState.name);
  });

  $scope.profile = function () {
    var pro = (JSON.parse(localStorage.getItem("pase.fit.storage-profiles_iri")))[0];
    if (pro.client_url !== undefined && pro.client_url !== null) {
      $state.go("app.client.profile");
    } else if (pro.studio_url !== undefined && pro.studio_url !== null) {
      $state.go("app.studio.profile");
    }
  };

  $scope.logout = function () {
    localStorage.clear();
    $state.go("access.login");
  };

  Restangular.configuration.getIdFromElem = function (elem) {
    var id = "";
    if (elem["@id"] !== undefined) {
      id = elem["@id"].split("/")[3];
    } else {
      id = elem.id;
    }
    return id;
  };
}
