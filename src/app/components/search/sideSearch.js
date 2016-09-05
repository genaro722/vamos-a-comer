angular
        .module('app')
//        .component('sideSearchStudio', {
        .component('sideSearch', {
          templateUrl: 'app/components/search/sideSearch.html',
          controller: sideSearchStudioCtrl,
          bindings: {
            resultado: "=",
            view: "=",
            idmarkercenter : "="
          }
        });

function sideSearchStudioCtrl() {

  var $ctrl = this;
  
  $ctrl.config = {
    mode: [
      {
        name: "boton 1",
        style:[],
        action: function (){
          console.log("Funcion del boton 1");
        }
      },
      {
        name: "boton 2",
        style:[],
        action: function (){
          console.log("Funcion del boton 2");
        }
      }
    ],
    actions: [
      [
      {
        name: "accion 1",
        tooltip: {
          name: "accion 1",
          open: "down"
      } ,
        icon: "",
        visible: true,
        disabled: false,
        style:["md-icon-button", "md-raised"],
        action: function (){
          console.log("Funcion del accion 1");
        }
      },
      {
        name: "accion 2",
        tooltip: {
          name: "accion 2",
          open: "down"
      },
        icon: "",
        visible: true,
        disabled: false,
        style:[],
        action: function (){
          console.log("Funcion del accion 2");
        }
      }
    ],
    [
      {
        name: "paginacion 1",
        tooltip: {
          name: "paginacion 1",
          open: "down"
      } ,
        icon: "",
        visible: true,
        disabled: false,
        style:["md-icon-button", "md-raised"],
        action: function (){
          console.log("Funcion del paginacion 2");
        }
      },{
        name: "paginacion 2",
        tooltip: {
          name: "paginacion 2",
          open: "down"
      } ,
        icon: "",
        visible: true,
        disabled: false,
        style:["md-icon-button", "md-raised"],
        action: function (){
          console.log("Funcion del paginacion 2");
        }
      }
      
    ]
  ],
    categories: [
      {
        name: "Categoria 1",
        hasChildren: true,
        children: [
          {
            name: "sub categoria 1",
            items: [{name: "item 1"}, {name: "item 2"}]
          },
          {
            name: "sub categoria 2",
            items: [{name: "item 1"}, {name: "item 2"}]
          }
        ],
        buttonStyle: [],
        showCategory: false,
        toggleCategory: function(){
          console.log("toogleCategory");
          console.log(this.name + " " + this.showCategory);
          this.showCategory = !this.showCategory;
        }
      },
      {
        name: "Categoria 2",
        hasChildren: false,
        items: [{name: "item 1"}, {name: "item 2"}],
        buttonStyle: [],
        showCategory: false,
        toggleCategory: function(){
          console.log("toggleCategory Categoria 2");
          this.showCategory = !this.showCategory;
        }
      }
    ]
  };
  $ctrl.showState = true;
  $ctrl.showCity = true;
  $ctrl.showCategory = true;
  $ctrl.showComodidades = true;
  $ctrl.map = true;
  $ctrl.searching = true;
  var listo = 0;
  $ctrl.paginacion = false;
  
  $ctrl.city2 = {id: ""};
  $ctrl.state2 = {id: ""};
  $ctrl.amenitiesIri = [];
  $ctrl.activitiesIri = [];
  $ctrl.listo = function (){
    var cambiantes = [$ctrl.showState, $ctrl.showCategory, $ctrl.showComodidades];
    for (var i = 0; i < cambiantes.length; i++) {
      if (cambiantes[i] === true) {
        listo += 1;
      }
    }
    console.log("Listo resultado " + listo);
    if (listo === 3) {
      console.log("listo listo");
      $ctrl.searching = false;
    }else{
      $ctrl.searching = true;
    }
  };
  
  $ctrl.mostrarZona = function () {
    $ctrl.zona = true;
  };
  $ctrl.toggleZona = function () {
    $ctrl.zona = !$ctrl.zona;
  };
  $ctrl.toggleActividad = function () {
    $ctrl.actividad = !$ctrl.actividad;
  };
  $ctrl.toggleComodidades = function () {
    $ctrl.comodidad = !$ctrl.comodidad;
  };
  
  $ctrl.toogleMap = function(){
    $ctrl.view =!$ctrl.view;
    if ($ctrl.view === true) {
      $ctrl.paginacion = true;
    }else{
      $ctrl.paginacion = false;
    }
  };
  
  $ctrl.clearSearch = function(){
    $ctrl.amenity = undefined;
    $ctrl.category = undefined;
    $ctrl.city2 = undefined;
    $ctrl.state2 = undefined;
  };
  
}
