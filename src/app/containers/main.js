angular
        .module('app')
        .component('mainComponent', {
          templateUrl: 'app/containers/main.html',
          controller: mainCtrl
        });

function mainCtrl($rootScope, $scope, $state, $mdSidenav, $log, $http, $mdMedia) {
  console.log("mainCtrl");
  var $ctrl = this;
  $http.get("app/data/menu.json").then(function success(response) {
    $ctrl.menu = response.data;
  }, function error(response) {
    console.log("Error al crear el menu");
  });
  
  $ctrl.profile = function () {
    console.log("perfil");
    var pro = (JSON.parse(localStorage.getItem("pase.fit.storage-profiles_iri")))[0];
    if (pro.client_url !== undefined && pro.client_url !== null) {
      $state.go("app.inside.client-profile");
    } else if (pro.studio_url !== undefined && pro.studio_url !== null) {
      $state.go("app.inside.studio-profile");
    }
  };

  $ctrl.logout = function () {
    localStorage.clear();
    $state.go("app.access.login");
  };
  $ctrl.toggleSideMenu = function () {
    $mdSidenav('left')
            .toggle();
  };
  $ctrl.toggleSideMenu = function () {
    $mdSidenav('left')
            .toggle();
  };
  $ctrl.toogleProfileMenu = function () {
    $mdSidenav('profile-menu')
            .toggle();
  };
  
  $ctrl.profileMenu = [
    {
      name: "opcion 1",
      icon: "account_circle",
    action: function(){
        console.log("accion de la opcion 1");
    }
  },
    {
      name: "opcion 2",
      icon: "",
    action: function(){
        console.log("accion de la opcion 2");
    }}
  ];
}
