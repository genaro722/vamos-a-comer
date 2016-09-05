angular.module('app')
        .component('location', {
          templateUrl: 'app/components/generics/location.html',
          controller: locationCtrl,
          bindings: {
            config: '=',
            markers: '=',
            clickeable: '=',
            idmarkercenter: '='
          }
        });

function locationCtrl($scope, $mdDialog) {
//  console.log("solo location");
  var $ctrl = this;
  $ctrl.modal = {};
  $ctrl.marker = {};
  $ctrl.markerControl = {};
//  console.log($ctrl.config);
  $scope.$watch('$ctrl.config.studio', function (newValue, oldValue) {
    if (newValue !== undefined) {
      if ($ctrl.config.studio.lat === undefined ||
              $ctrl.config.studio.lat === null ||
              $ctrl.config.studio.lat === "") {
      } else {
        var marker = {
          id: Date.now(),
          coords: {
            latitude: parseFloat($ctrl.config.studio.lat),
            longitude: parseFloat($ctrl.config.studio.lon)
          }
        };
        if ($ctrl.markers === undefined) {
          $ctrl.markers = [marker];
        } else {
          $ctrl.markers.push(marker);
        }
        $ctrl.goToLocation($ctrl.markers[0].coords.latitude, $ctrl.markers[0].coords.longitude);
      }
    }
  });

  $scope.$watchCollection('$ctrl.markers', function (newValue, oldValue) {
    if (newValue === undefined) {
//      console.log("Marcadores indefinidos");
    } else if (newValue[0] !== undefined) {
//      console.log("Marcadores cambiados");
//      console.log(newValue[0]);
      $ctrl.goToLocation(newValue[0].coords.latitude, newValue[0].coords.longitude);
    }

  });
  $scope.$watch('$ctrl.idmarkercenter', function (newValue, oldValue) {
    if (newValue !== undefined && $ctrl.markers[0] !== undefined) {
      $ctrl.goToLocation($ctrl.markers[newValue].coords.latitude, $ctrl.markers[newValue].coords.longitude);
    }
  });

  $ctrl.preSaveLocation = function () {
    $ctrl.modal.title = "Aviso";
    $ctrl.modal.messages = [{mess: "Guardando ubicación"}];
    $ctrl.open("info");
    $ctrl.saveLocation();
  };

  $ctrl.saveLocation = function () {
    $ctrl.config.studio.put().then(function success(response) {
      $ctrl.modal.title = "Exito";
      $ctrl.modal.messages = [{mess: "Ubicación Guardada exitosamente"}];
      $ctrl.open("info");
    }, function error(response) {
//      console.log("error");
//      console.log(response);
      $ctrl.modal.title = "Error";
      $ctrl.modal.messages = [{mess: "No se pudo guardar la ubicación"}];
      $ctrl.open("info");
    });
  };

  $ctrl.openWindow = function (marker) {
    console.log("marker");
    console.log(marker);
    console.log(marker[$ctrl.config.marker.id]);
      marker.showWindow = true;
//    $ctrl.showWindow = true;
    $ctrl.coords = marker.coords;
  };

  $ctrl.windowOptions = {
    boxClass: "infobox",
    boxStyle: {
      backgroundColor: "#ff2542",
      border: "none",
      borderRadius: "0px",
      width: "200px",
      height: "200px"
    },
      content: "<span class='pf-font-default white-text font-18-pt md-headline'> NOMBRE DEL ESTUDO</span>",
//      content: "<md-button ui-sref='app.inside.studio-profile-public({id: $ctrl.studio.id}) class='pf-font-default white-text font-18-pt md-headline'>NOMBRE DEL ESTUDIO AQUI</md-button>",
//      content: " NOMBRE DEL ESTUDO",
//    content: "<div flex layout='column' layout-padding>" +
//            "<div flex='50' layout='column' layout-align='center start' layout-padding>" +
//            "<div flex-lg='50' flex-md='60' flex-sm='70' flex-xs='85' layout='column' layout-align='center start' layout-padding>" +
//            "<md-button ui-sref='app.inside.studio-profile-public({id: $ctrl.studio.id}) class='pf-font-default white-text font-18-pt md-headline'>" +
//            "NOMBRE DEL ESTUDIO AQUI" +
//            "</md-button>" +
//            "</div>" +
//            "<div flex-lg='50' flex-md='40' flex-sm='30' flex-xs='15' layout='column' layout-align='center start' layout-padding>" +
//            "<span class='pf-font-default white-text font-18-pt' show-xs hide-sm show-gt-sm>{{$ctrl.studio.studioCityName}}</span>" +
//            "</div>" +
//            "</div>" +
//            "<md-divider class='divider-white-1'></md-divider>" +
//            "<div flex='50' layout-align='center start' layout-padding> " +
//            "<stars config='$ctrl.starConfig'></stars>" +
//            "</div>" +
//            "</div>",
    disableAutoPan: true,
    maxWidth: 0,
    zIndex: null,
    closeBoxMargin: "10px",
    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
//    pixelOffset : 110
//    pixelOffset : Size(10, 110, "px", "px")
  };

  $ctrl.goToLocation = function (lat, lon) {
//    console.log("Seteando centro");
//    console.log(lat);
//    console.log(lon);
    $ctrl.mapOptions.center = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };
  };
  //  Cosas de mapas
  $ctrl.mapOptions = {
//    center: {latitude: 10.241192, longitude: -66.859407},
    center: {latitude: 10.241009, longitude: -66.859448},
    zoom: 15,
    events: {
      click: function (map, eventName, originalEventArgs) {
        console.log("click");
        if ($ctrl.clickeable === true) {
          var e = originalEventArgs[0];
          var lat = e.latLng.lat();
          var lon = e.latLng.lng();
//        $ctrl.marker.coords = {
//          latitude: lat,
//          longitude: lon
//        };
          var marker = {
            id: Date.now(),
            coords: {
              latitude: lat,
              longitude: lon
            }
          };
          $ctrl.markers[0] = marker;
          $ctrl.config.studio.lon = lon;
          $ctrl.config.studio.lat = lat;
          $ctrl.preSaveLocation();
          console.log($ctrl.markers);
          $ctrl.goToLocation(lat, lon);
        }

      }
    }
  };

  $ctrl.open = function (type) {
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
