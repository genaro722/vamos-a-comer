angular
  .module('app')
  .component('sidemenuComponent', {
    templateUrl: 'app/components/main/sidemenu.html',
//    controller: sideMenuCtrl
    controller: mainCtrl
  });

function sideMenuCtrl($scope, $http) {
  $scope.close = function () {
    console.log("Cerrar");
  };
  $http.get("app/data/menu.json").then(function success(response) {
    $scope.menu = response.data;
  }, function error(response) {
    console.log("Error al crear el menu");
  });
}
