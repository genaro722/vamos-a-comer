angular.module('app')
        .component('location-crud', {
          templateUrl: 'app/components/location-crud.html',
          controller: locationCrudCtrl,
          bindings: {
            config: '='
          }
        });

function locationCrudCtrl($scope, Location, $mdDialog) {
  var $ctrl = this;
  $ctrl.markers = [];
  $ctrl.modal = {};
  $ctrl.marker = {};
  console.log($ctrl.config);
  $scope.$watch('$ctrl.config.ownerIri', function (newValue, oldValue) {
    console.log("ownerIri = " + newValue);
    if (newValue !== undefined) {
      var id = String(newValue.split("/")[3]);
      $ctrl.loadLocations(id);
    }
  });

  $ctrl.loadLocations = function (id) {
    Location.customGET("", {studio: id}).then(function success(response) {
      console.log("Ubicaciones cargadas correctamente");
//      console.log(response);
      $ctrl.locations = response["hydra:member"];
      console.log($ctrl.locations[0]);
      $ctrl.addMarkers($ctrl.locations);
    }, function error(response) {
      console.log("Error al cargar ubicaciones");
      console.log(response);
    });
  };

  $ctrl.saveLocations = function () {
    $ctrl.editing = false;
    console.log($ctrl.profile);
    $ctrl.location.studio = $ctrl.profile["@id"];
    console.log($ctrl.location);
    Location.post($ctrl.location).then(success, error);
  };

  $ctrl.preSaveLocation = function () {
    $ctrl.modal.title = "Alerta";
    $ctrl.modal.messages = [{mess: "Faltan datos"}];
    if ($ctrl.markers[0].id === undefined ||
            $ctrl.markers[0].id === "") {
      $ctrl.modal.messages = [{mess: "Ingrese el nombre de la ubicación"}];
      $ctrl.open("info");
    } else if ($ctrl.markers[0].locationAbout === "" ||
            $ctrl.markers[0].locationAbout === undefined) {
      $ctrl.modal.messages = [{mess: "Ingrese la descripcion de la ubicación"}];
      $ctrl.open("info");
    } else if ($ctrl.markers[0].locationX === undefined ||
            $ctrl.markers[0].locationY === undefined) {
      $ctrl.modal.messages = [{mess: "Seleccione en el mapa la ubicación"}];
      $ctrl.open("info");
    } else {
      $ctrl.saveLocation();
    }
  };

  $ctrl.saveLocation = function () {
    console.log($ctrl.markers[0]);
    $ctrl.editingLocation = false;
    for (var key in $ctrl.config.extra) {
      $ctrl.markers[0][key] = $ctrl.config.extra[key];
    }
    var id = String($ctrl.config.ownerIri.split("/")[3]);
    $ctrl.markers[0].locationName = $ctrl.markers[0].id;
    Location.post($ctrl.markers[0]).then(function success(response) {
      $ctrl.modal.title = "Exito";
      $ctrl.modal.messages = [{mess: "Guardado exitosamente"}];
      $ctrl.open("info");
      $ctrl.loadLocations($ctrl.id);
    }, function error(response) {
      console.log("error");
      console.log(response);
    });
  };

  $ctrl.preEditLocation = function (location) {
    $ctrl.editingLocation = true;
    $ctrl.edit = true;

    $ctrl.setMapOnAll(null, $ctrl.markers);
    $ctrl.location = location;
    for (var i = 0; i < $ctrl.markers.length; i++) {
      if ($ctrl.markers[i].title === location.locationName) {
        $ctrl.markers[i].setMap($ctrl.myMap);
        $ctrl.marker = $ctrl.markers[i];
      }
    }
  };

  $ctrl.cancelEditLocation = function () {
    $ctrl.editingLocation = false;
    for (var i = 0; i < $ctrl.backup.length; i++) {
      $ctrl.markers.push($ctrl.backup[i]);
    }
  };

  $ctrl.preDeleteLocation = function (location) {
    $ctrl.modal.title = "Eliminar";
    $ctrl.modal.messages = [{mess: "¿Desea eliminar esta ubicación?"}];
    $ctrl.open("confirm").then(function confirm() {
      $ctrl.deleteLocation(location);
    });
  };

  $ctrl.deleteLocation = function (location) {
    console.log("Eliminar ubicacion");
    console.log(location);
    var id = String(location["@id"].split("/")[3]);
    Location.customDELETE(id).then(function (response) {
      $ctrl.modal.title = "Exito";
      $ctrl.modal.messages = [{mess: "Eliminado exitosamente"}];
      $ctrl.open("info");
      $ctrl.loadLocations($ctrl.id);
    }, function error(response) {
      console.log("Error al eliminar");
      console.log(response);
    });
  };

  $ctrl.allowEditLocations = function () {
    console.log("allowEditLocations");
    $ctrl.editingLocation = true;
    $ctrl.backup = [];
    for (var i = 0; i < $ctrl.markers.length; i++) {
      $ctrl.backup.push($ctrl.markers[i]);
    }
    $ctrl.markers = [{id: ""}];
//     $scope.$apply();
  };

  //  Cosas de mapas
  $ctrl.mapOptions = {
    center: {latitude: 10.241192, longitude: -66.859407},
    zoom: 15,
    events: {
      click: function (map, eventName, originalEventArgs) {
        console.log(eventName);
        if ($ctrl.editingLocation === true) {
          var e = originalEventArgs[0];
          var lat = e.latLng.lat();
          var lon = e.latLng.lng();
//          $ctrl.marker.coords = {
//            latitude: lat,
//            longitude: lon
//          };
//          $ctrl.marker.locationX = lon;
//          $ctrl.marker.locationY = lat;
          $ctrl.markers[0].coords = {
            latitude: lat,
            longitude: lon
          };
          $ctrl.markers[0].locationX = lon;
          $ctrl.markers[0].locationY = lat;

//          $ctrl.markers = [];
//          $ctrl.markers.push($ctrl.marker);
          $scope.$apply();
        }
      }
    }
  };

  $ctrl.addMarkers = function (array) {
    console.log("Agregando marcadores");
    if (array.length > 0) {
      $ctrl.mapOptions.center.latitude = parseFloat(array[0].locationY);
      $ctrl.mapOptions.center.longitude = parseFloat(array[0].locationX);
      for (var i = 0; i < array.length; i++) {
        $ctrl.markers.push({
          coords: {latitude: parseFloat(array[i].locationY), longitude: parseFloat(array[i].locationX)},
          id: array[i].locationName
        });
      }
      console.log($ctrl.markers);
    } else {
      console.log("sin marcadores");
    }
  };

  $ctrl.goToLocation = function (location) {
    $ctrl.mapOptions.center.latitude = parseFloat(location.locationY);
    $ctrl.mapOptions.center.longitude = parseFloat(location.locationX);
  };

  $ctrl.open = function (type) {
//    console.log("Abrir modal");
//    console.log($ctrl.modal);
    var mes = "";
    var dialog = "";
    for (var i = 0; i < $ctrl.modal.messages.length; i++) {
      mes += $ctrl.modal.messages[i].mess + "\n";
    }
    if (type === "info") {
      dialog = $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(false)
              .title($ctrl.modal.title)
              .textContent(mes)
              .ariaLabel('Alert')
              .ok('ok');
    } else if (type === "confirm") {
      dialog = $mdDialog.confirm()
              .clickOutsideToClose(false)
              .title($ctrl.modal.title)
              .ariaLabel('Confirmar')
              .textContent(mes)
              .ariaLabel('Alert')
              .ok('ok')
              .cancel('Cancelar');
    }
    return $mdDialog.show(dialog);
  };
}
