angular.module('app')
        .component('app', {
          templateUrl: 'app/containers/App.html',
          controller: App
        });

function App($rootScope, $scope, $state, jwtHelper, Restangular) {
  $scope.title="Pase.Fit";
  function comprobarSesion(toState) {
    console.log("Comprobando sesión");
    if (toState === "app.access.login" ||
            toState === "app.access.register" ||
            toState === "app.access.registerForm" ||
            toState === 'app.access.forgotPwd' ||
            toState === "app.access.resetPwd") {
      console.log("No redirigir");
    } else {
      var token = localStorage.getItem("pase.fit.storage-token");
      if (token !== undefined && token !== null) {
        console.log("1");
        if (jwtHelper.isTokenExpired(token) === true) {
          console.log("token expirado-redirigiendo");
          localStorage.clear();
          $state.go('app.access.login');
        } else {
          console.log("todo bien, continuar");
        }
      } else {
        console.log("2");
        console.log("Token indefinido, redirigiendo");
        $state.go('app.access.login');
      }
    }
  }

  $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
    comprobarSesion(toState.name);
  });

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
