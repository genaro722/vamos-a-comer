angular.module('app')
        .component('stars', {
          templateUrl: 'app/components/stars.html',
          controller: starsCtrl,
          bindings: {
            config: '='
          }
        });

function starsCtrl($scope) {
  var $ctrl = this;
    if ($ctrl.config!==null && $ctrl.config!==undefined) {
        $ctrl.valoracion = $ctrl.config.valor;
    }
  
  $ctrl.estrellaLlena = [];
  $ctrl.estrellaVacia = [];
  $ctrl.estrellaMedia = [];
  $ctrl.stars = function () {
    if ($ctrl.valoracion % 1 === 0) {
//        console.log("Es un numero entero");
      for (var i = 0; i < $ctrl.valoracion; i++) {
        $ctrl.estrellaLlena.push(i);
      }
      var resto = 5 - $ctrl.valoracion;
      for (var a = 0; a < resto; a++) {
        $ctrl.estrellaVacia.push(a);
      }
    } else {
      $ctrl.valoracion = String($ctrl.valoracion);
//        console.log("Es un numero decimal");
      var sp = $ctrl.valoracion.split(".");
      sp[0] = parseInt(sp[0], 10);
      for (var e = 0; e < sp[0]; e++) {
        $ctrl.estrellaLlena.push(e);
      }
      $ctrl.estrellaMedia.push(1);
      sp[2] = 5 - sp[0] - 1;
//            console.log(sp[2]);
      for (var o = 0; o < sp[2]; o++) {
        $ctrl.estrellaVacia.push(o);
      }
    }
  };
  $ctrl.stars();
}
