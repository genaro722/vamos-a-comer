angular
  .module('app')
  .component('sidemenuComponent', {
    templateUrl: 'app/components/main/sidemenu.html',
    controller: sideMenuCtrl
  });

function sideMenuCtrl($scope) {
  $scope.close = function () {
    console.log("Cerrar");
  };
}
