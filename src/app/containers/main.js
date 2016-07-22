angular
        .module('app')
        .component('mainComponent', {
          templateUrl: 'app/containers/main.html',
          controller: mainCtrl
        });

function mainCtrl($rootScope, $scope, $state, $mdSidenav, $log, $http, $mdMedia) {
  $scope.conf = {
    appName: "Pase.Fit"
  };
  
  $http.get("app/data/menu.json").then(function success(response) {
    $scope.menu = response.data;
  }, function error(response) {
    console.log("Error al crear el menu");
  });
  
  $scope.profile = function () {
    console.log("perfil");
    var pro = (JSON.parse(localStorage.getItem("pase.fit.storage-profiles_iri")))[0];
    if (pro.client_url !== undefined && pro.client_url !== null) {
      $state.go("app.inside.client-profile");
    } else if (pro.studio_url !== undefined && pro.studio_url !== null) {
      $state.go("app.inside.studio-profile");
    }
  };

  $scope.logout = function () {
    localStorage.clear();
    $state.go("app.access.login");
  };
  $scope.toggleSideMenu = function () {
    $mdSidenav('left')
            .toggle();
  };
}
