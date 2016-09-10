angular.module('app')
        .component('arawappForm', {templateUrl: 'app/parts/arawappForm.html',
          controller: customFormCtrl,
          bindings: {
            object: '=',
            editing: '=',
            config: '='
          }});

function customFormCtrl($scope) {

  var $ctrl = this;
  $ctrl.list = [];
  $ctrl.form = [];
  $ctrl.verdadero = true;
  $ctrl.falso = false;
  if ($ctrl.config.height === undefined) {
    $ctrl.config.height = {'max-height': '350px'};
  }

  var mitad = function () {
    if ($ctrl.form !== undefined) {
      console.log($ctrl.config.mensaje);
      var mid = Math.ceil($ctrl.form.length / 2);
      $ctrl.left = $ctrl.form.slice(0, mid);
      $ctrl.right = $ctrl.form.slice(mid, $ctrl.form.length);
//      console.log("Arawapp left");
//      console.log($ctrl.left);
//      console.log("Arawapp rigth");
//      console.log($ctrl.right);
    }
  };
  $scope.$watch('$ctrl.config.object', function (newValue, oldValue) {
    console.log(newValue);
    $ctrl.list = [];
    $ctrl.form = [];
    for (var key in newValue) {
//      if (key[0] === '@' || typeof (newValue[key]) === 'array' || typeof (newValue[key]) === 'function') {
      if (key[0] === '@' || typeof (newValue[key]) === 'function') {

      } else if (typeof (newValue[key]) === 'object') {
        if (newValue[key] === null) {
          $ctrl.form.push(key);
        }
        for (var key2 in $ctrl.config.include) {
          if (key2 === key) {
            $ctrl.form.push(key);
          }
        }
      } else {
        $ctrl.list.push(key);
        $ctrl.form.push(key);
      }
    }

    for (var k in $ctrl.config.exclude) {
      if (k === undefined) {

      } else {
        for (var i = 0; i < $ctrl.list.length; i++) {
          if (k === $ctrl.list[i]) {
            $ctrl.list.splice(i, 1);
            break;
          }
        }
      }

    }
//    para excluir del formulario
    for (var k2 in $ctrl.config.exclude) {
      if (k2 === undefined) {

      } else {
        for (var i2 = 0; i2 < $ctrl.form.length; i2++) {
          if (k2 === $ctrl.form[i2]) {
            $ctrl.form.splice(i2, 1);
            break;
          }
        }
      }
    }

    mitad();
  });
}
