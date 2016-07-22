angular.module('app')
        .component('perfil', {templateUrl: 'app/components/perfil.html', controller: perfilCtrl});
angular.module('app')
        .component('perfilEstudio', {templateUrl: 'app/components/perfil-estudio.html', controller: perfilCtrl});

function perfilCtrl($scope, Client, Studio, Location, uiGmapGoogleMapApi) {
  $scope.profile = {};
  $scope.location = {};
  $scope.modal = {};
  $scope.editing = false;
  $scope.editingLocation = false;
  $scope.markers = [];

  var success = function (response) {
    $scope.modal.title = "Exito";
    $scope.modal.messages = [{mess: "Guardado exitosamente"}];
    $scope.open("modal-sm");
  };
  var error = function (reason) {
    console.log("error guardar client");
    console.log(reason);
    $scope.modal.title = reason.data["hydra:title"];
    $scope.modal.messages = [{mess: reason.data["hydra:description"]}];
    $scope.open("modal-sm");
    $scope.editing = true;
  };

  var pro = (JSON.parse(localStorage.getItem("pase.fit.storage-profiles_iri")))[0];
  $scope.id = pro.studio_url.split("/")[3];

  if (pro.client_url !== undefined && pro.client_url !== null) {
    console.log(pro.client_url);
    console.log("Solicitud de perfil " + $scope.id);
    Client.get($scope.id).then(function (response) {
      console.log(response);
      $scope.profile = response;
    }, function (response) {
      console.log("Error");
      console.log(response);
    });
  } else if (pro.studio_url !== undefined && pro.studio_url !== null) {
//        console.log(pro.studio_url.split("/"));

    Studio.get($scope.id).then(function (response) {
      console.log(response);
      $scope.profile = response;
      $scope.loadLocations($scope.id);
    }, function (response) {
      console.log("Error");
      console.log(response);
    });
  }

  $scope.save = function () {
    $scope.editing = false;
    $scope.profile.user = localStorage.getItem("pase.fit.storage-user_iri");
    console.log($scope.profile);
    var rol = (JSON.parse(localStorage.getItem("pase.fit.storage-roles")))[0];
    if (rol === "ROLE_CLIENT") {
      $scope.profile.put().then(success, error);
    } else {
      $scope.profile.put().then(success, error);
//            $scope.location.post().then(success,error);
      $scope.location.studio = $scope.profile["@id"];
    }
  };

  $scope.loadLocations = function (id) {
    Location.customGET("", {studio: id}).then(function success(response) {
      console.log(response);
      $scope.locations = response;
//      $scope.addMarkers($scope.locations["hydra:member"]);
    }, function error(response) {
      console.log("Error al cargar ubicaciones");
      console.log(response);
    });
  };

  $scope.saveLocations = function () {
    $scope.editing = false;
    console.log($scope.profile);
    var rol = (JSON.parse(localStorage.getItem("pase.fit.storage-roles")))[0];
    $scope.location.studio = $scope.profile["@id"];
    console.log($scope.location);
    Location.post($scope.location).then(success, error);
  };

  $scope.preSaveLocation = function () {
    $scope.editingLocation = true;
    $scope.setMapOnAll(null, $scope.markers);
  };

  $scope.saveLocation = function () {
    if ($scope.location.locationName !== undefined &&
            $scope.location.locationName !== "" &&
            $scope.location.locationAbout !== "" &&
            $scope.location.locationAbout !== undefined &&
            $scope.marker !== undefined) {
      $scope.editingLocation = false;
      $scope.edit = true;
      $scope.location.studio = $scope.profile["@id"];
      console.log($scope.location);
      Location.post($scope.location).then(function (response) {
        $scope.modal.title = "Exito";
        $scope.modal.messages = [{mess: "Guardado exitosamente"}];
        $scope.open("modal-sm");
        $scope.loadLocations($scope.id);
      }, error);
    } else {
      $scope.modal.title = "Error";
      $scope.modal.messages = [{mess: "Faltan datos"}];
      $scope.open("modal-sm");
    }
  };

  $scope.preEditLocation = function (location) {
    $scope.editingLocation = true;
    $scope.edit = true;

    $scope.setMapOnAll(null, $scope.markers);
    $scope.location = location;
    for (var i = 0; i < $scope.markers.length; i++) {
      if ($scope.markers[i].title === location.locationName) {
        $scope.markers[i].setMap($scope.myMap);
        $scope.marker = $scope.markers[i];
      }
    }
  };

  $scope.cancelEdit = function () {
    $scope.editingLocation = false;
    $scope.edit = true;
    $scope.setMapOnAll($scope.myMap, $scope.markers);
  };

  $scope.preDeleteLocation = function (location) {
    $scope.modal.title = "Eliminar";
    $scope.modal.messages = [{mess: "¿Desea eliminar esta ubicación?"}];
    $scope.modal.onConfirm = function () {
      console.log("On confirm preDeleteLocation");
      $scope.deleteLocation(location);
    };
    $scope.openConfirm("modal-sm");
  };

  $scope.deleteLocation = function (location) {
    console.log("Eliminar ubicacion");
    console.log(location);
    var id = String(location["@id"].split("/")[3]);
    Location.customDELETE(id).then(function (response) {
      $scope.modal.title = "Exito";
      $scope.modal.messages = [{mess: "Eliminado exitosamente"}];
      $scope.open("modal-sm");
      $scope.loadLocations($scope.id);
    }, error);
  };

  $scope.open = function (size, windowClass) {
    var modalInstance = $modal.open({
      templateUrl: 'angular/partials/pase-fit/modal-info.html',
      controller: 'ModalInfoCtrl',
      windowClass: windowClass,
      size: size,
      resolve: {
        modal: function () {
          return $scope.modal;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm = function (size, windowClass) {
    var modalInstance = $modal.open({
      templateUrl: 'angular/partials/pase-fit/modal-confirm.html',
      controller: 'ModalConfirmCtrl',
      windowClass: windowClass,
      size: size,
      resolve: {
        modal: function () {
          return $scope.modal;
        }
      }
    });
  };

  $scope.allowEdit = function () {
    $scope.editing = true;
  };
  $scope.allowEditLocations = function () {
    $scope.editingLocation = true;
  };

  //  Cosas de mapas
  $scope.mapOptions = {
    center: { latitude: 10.241192, longitude: -66.859407 },
    zoom: 15
  };
//  $scope.marker={
//    id: 0,
//    coords: {
//        latitude: 10.241192,
//        longitude: -66.859407
//      }
//  };
  $scope.markers=[
    {
    id: 0,
    coords: {
        latitude: 10.241192,
        longitude: -66.859407
      }
  },
    {
    id: 1,
    coords: {
        latitude: 10.232322707473,
        longitude: -66.854481473565
      }
  }
];

//  $scope.addMarkers = function (array) {
//    console.log("Agregando marcadores");
//    $scope.myMap.setCenter({lat: parseFloat(array[0].locationY), lng: parseFloat(array[0].locationX)});
//    for (var i = 0; i < array.length; i++) {
//      console.log(array[i]);
//      $scope.markers.push(new google.maps.Marker({
//        map: $scope.myMap,
//        position: {lat: parseFloat(array[i].locationY), lng: parseFloat(array[i].locationX)},
//        title: array[i].locationName
//      }));
//    }
//    console.log($scope.markers);
//  };

  $scope.goToLocation = function (location) {
    $scope.myMap.setCenter({lat: parseFloat(location.locationY), lng: parseFloat(location.locationX)});
  };

//  $scope.addMarker = function ($event, $params) {
//    console.log($scope.marker);
//    if ($scope.editingLocation === true) {
//      if ($scope.marker !== undefined) {
//        console.log("Entrando");
//        $scope.marker.setMap(null);
//        $scope.marker = {};
//      }
//      $scope.marker = new google.maps.Marker({
//        map: $scope.myMap,
//        position: $params[0].latLng
//      });
//      $scope.position = $params[0].latLng;
//      $scope.location.locationX = $scope.position.lng();
//      $scope.location.locationY = $scope.position.lat();
//      console.log($scope.location);
//    }
//  };

  $scope.tilesLoaded = function () {
    console.log("tilesLoaded");
  };

  $scope.setMapOnAll = function (map, markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  };
}
