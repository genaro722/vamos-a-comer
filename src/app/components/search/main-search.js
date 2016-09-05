angular.module('app')
        .component('mainSearch', {templateUrl: 'app/components/search/main-search.html',
  controller: searchCtrl});

function searchCtrl($scope) {
  var $ctrl = this;
  $ctrl.map = true;
  $ctrl.idmarkercenter = 0;
  $ctrl.resultado = [];
  $ctrl.locations = [];
  $ctrl.locationConfig = {crud: false, header: false, 
    marker: {
      id: 'studioName'
    }
  };
  $ctrl.header = true;
  $ctrl.search = "";
  $ctrl.changeStyle = function () {
    console.log("Cambiando estilo");
    $ctrl.header = !$ctrl.header;
    if ($ctrl.search === "") {
      $ctrl.search = "pf-photo-fixside";
    } else {
      $ctrl.search = "";
    }
  };

  $scope.$watch('$ctrl.resultado', function(newValue, oldValue) {
     for (var i = 0; i < newValue.length; i++) {
      newValue[i].coords = {
         latitude: parseFloat(newValue[i].lat),
            longitude: parseFloat(newValue[i].lon)
    };
    newValue[i].showWindow = false;
//      ubicaciones.push(marker);
    }
    $ctrl.locations = $ctrl.resultado;
   
});

}
