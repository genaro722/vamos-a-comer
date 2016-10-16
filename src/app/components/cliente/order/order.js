angular.module('app')
        .component('order', {templateUrl: 'app/cliente/order/order.html',
          controller: listRestFoodCtrl});

function listRestFoodCtrl($scope) {
  var $ctrl = this;
  
  $ctrl.configStars = {
  };
  $ctrl.configStars2 = {
    valor: 4
  };
  $ctrl.seeRestaurant = false;
  $ctrl.showList = false;
  $ctrl.filas = [];
  
  $ctrl.showIngredients = false;
  $ctrl.flexOrderList = 35;
  $ctrl.extras = [
    {name: "Salsa de tomate", include: true},
    {name: "Papas fritas", include: false}
  ];
  $ctrl.ingredients = [
    {name: "Tomate", include: false},
    {name: "Pimenton", include: true},
    {name: "Cebolla", include: false}
  ];
  
  $ctrl.toogleIngredients = function(){
    $ctrl.showIngredients = !$ctrl.showIngredients;
    if ($ctrl.showIngredients === true) {
      $ctrl.flexOrderList = 60;
    }else{
       $ctrl.flexOrderList = 35;
    }
  };
  //Este sera un binding
  
  $ctrl.results = [
    {
      name: "Comida 1",
      description: "Muchisima hambre 1",
      image: "app/img/comidas/comida-1.jpg",
      available: true,
      price: "300 bs",
      calificationTotal: 3,
      menus: [
        {
          menuCategory: {id: 1, name: "Pollo"}
        },
        {
          menuCategory: {id: 2, name: "Pasta"}
        }
      ],
      restaurant: {
        name: "restaurant 1",
        address: "Avenida Tosta Garcia, cruce con calle 12, edif ecclanum",
        state: 2,
        stateName: "Miranda",
        city: 3,
        cityName: "Charallave",
        phone: "0239-2222222",
        rif: "J-3907128",
        image: "app/img/restaurantes/restaurant-1.jpg",
        logo: "",
        about: "restauran restaurantoso",
        web: "www.tengohambre.com",
        facebook: "facebook.com/tengohambre",
        twitter: "twitter.com/tengoHambre",
        bookingWindow: "",
        lat: "",
        lon: "",
        calificationTotal: 3
      }
    },
    {
      name: "Comida 2",
      description: "Muchisima hambre 2",
      image: "app/img/comidas/comida-2.jpg",
      available: false,
      price: "5000 bs",
      calificationTotal: 3,
      menus: [
        {
          menuCategory: {id: 1, name: "Pollo"}
        },
        {
          menuCategory: {id: 2, name: "Pasta"}
        }
      ],
      restaurant: {
        name: "restaurant 1",
        address: "Avenida Tosta Garcia, cruce con calle 12, edif ecclanum",
        state: 2,
        stateName: "Miranda",
        city: 3,
        cityName: "Charallave",
        phone: "0239-2222222",
        rif: "J-3907128",
        image: "app/img/restaurantes/restaurant-1.jpg",
        logo: "",
        about: "restauran restaurantoso",
        web: "www.tengohambre.com",
        facebook: "facebook.com/tengohambre",
        twitter: "twitter.com/tengoHambre",
        bookingWindow: "",
        lat: "",
        lon: "",
        calificationTotal: 3
      }
    },
    {
      name: "Comida 3",
      description: "Muchisima hambre 3",
      image: "app/img/comidas/comida-3.jpg",
      available: false,
      price: "76000 bs",
      calificationTotal: 3,
      menus: [
        {
          menuCategory: {id: 1, name: "Pollo"}
        },
        {
          menuCategory: {id: 2, name: "Pasta"}
        }
      ],
      restaurant: {
        name: "restaurant 1",
        address: "Avenida Tosta Garcia, cruce con calle 12, edif ecclanum",
        state: 2,
        stateName: "Miranda",
        city: 3,
        cityName: "Charallave",
        phone: "0239-2222222",
        rif: "J-3907128",
        image: "app/img/restaurantes/restaurant-1.jpg",
        logo: "",
        about: "restauran restaurantoso",
        web: "www.tengohambre.com",
        facebook: "facebook.com/tengohambre",
        twitter: "twitter.com/tengoHambre",
        bookingWindow: "",
        lat: "",
        lon: "",
        calificationTotal: 3
      }
    },
    {
      name: "Comida 4",
      description: "Muchisima hambre 4",
      image: "app/img/comidas/comida-1.jpg",
      available: false,
      price: "76000 bs",
      calificationTotal: 3,
      menus: [
        {
          menuCategory: {id: 1, name: "Pollo"}
        },
        {
          menuCategory: {id: 2, name: "Pasta"}
        }
      ],
      restaurant: {
        name: "restaurant 1",
        address: "Avenida Tosta Garcia, cruce con calle 12, edif ecclanum",
        state: 2,
        stateName: "Miranda",
        city: 3,
        cityName: "Charallave",
        phone: "0239-2222222",
        rif: "J-3907128",
        image: "app/img/restaurantes/restaurant-1.jpg",
        logo: "",
        about: "restauran restaurantoso",
        web: "www.tengohambre.com",
        facebook: "facebook.com/tengohambre",
        twitter: "twitter.com/tengoHambre",
        bookingWindow: "",
        lat: "",
        lon: "",
        calificationTotal: 3
      }
    },
    {
      name: "Comida 5",
      description: "Muchisima hambre 5",
      image: "app/img/comidas/comida-2.jpg",
      available: false,
      price: "100000 bs",
      calificationTotal: 3,
      menus: [
        {
          menuCategory: {id: 1, name: "Pollo"}
        },
        {
          menuCategory: {id: 2, name: "Pasta"}
        }
      ],
      restaurant: {
        name: "restaurant 1",
        address: "Avenida Tosta Garcia, cruce con calle 12, edif ecclanumCalle",
        state: 2,
        stateName: "Miranda",
        city: 3,
        cityName: "Charallave",
        phone: "0239-2222222",
        rif: "J-3907128",
        image: "app/img/restaurantes/restaurant-1.jpg",
        logo: "",
        about: "restauran restaurantoso",
        web: "www.tengohambre.com",
        facebook: "facebook.com/tengohambre",
        twitter: "twitter.com/tengoHambre",
        bookingWindow: "",
        lat: "",
        lon: "",
        calificationTotal: 3
      }
    }
  ];
  
  $ctrl.restaurant = $ctrl.results[0].restaurant;

  $ctrl.viewRestaurant = function () {
    $ctrl.seeRestaurant = true;
  };
  
  $ctrl.closeRestaurant = function(){
    $ctrl.seeRestaurant = false;
//    $ctrl.showList = 
  };
  
  $ctrl.excludeFromOrder = function(index){
//    $ctrl.results = 
    $ctrl.results.splice(index, 1);
  };
  
  
}