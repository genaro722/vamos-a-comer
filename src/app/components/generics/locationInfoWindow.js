angular.module('app')
        .component('locationWindow', {
            templateUrl: 'app/parts/locationInfoWindow.html',
            controller: locationInfoWindowCtrl,
            bindings: {
                studio: '='
            }
        });

function locationInfoWindowCtrl($scope) {
    var $ctrl = this;
    $ctrl.starConfig = {
      style: ["white-text"],
      styleIcon: ["fa-2x"],
      valor: 3,
      mostrarValor: false
    };
    
    $scope.$watch("$ctrl.studio", function(newValue, oldValue){
      console.log("Cambio en la ventana interna del mapa");
      console.log(newValue);
    });
}


