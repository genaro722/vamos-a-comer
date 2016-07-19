angular.module('app').component('modalInfoComponent', {
  templateUrl: 'app/components/modals/modalInfo.html',
  controller: DialogCtrl,
  bindings: {
    text: "<"
  }
});

/** @ngInject */
function DialogCtrl($mdDialog) {
  console.log(this.text);
  this.hide = function () {
    console.log("Cerrar");
    $mdDialog.hide();
  };
  this.cancel = function () {
    console.log("cancelar");
    $mdDialog.cancel();
  };
  this.answer = function (answer) {
    $mdDialog.hide(answer);
  };
  console.log(this.text);
}

//  $scope.title = modal.title;
//  console.log($scope);
//  $scope.hide = function () {
//    console.log("Cerrar");
//    $mdDialog.hide();
//  };
//  $scope.cancel = function () {
//    $mdDialog.cancel();
//  };
//  $scope.answer = function (answer) {
//    $mdDialog.hide(answer);
//  };
