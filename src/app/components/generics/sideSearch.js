angular
        .module('app')
//        .component('sideSearchStudio', {
        .component('sideSearch', {
          templateUrl: 'app/components/generics/sideSearch.html',
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
    title: {name: "busqueda avanzada",
      style: [],
      divider: true
    },
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
}
