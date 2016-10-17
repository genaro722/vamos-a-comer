angular.module('app')
        .component('listRestFood', {templateUrl: 'app/cliente/search/list-rest-food.html',
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

  var agrupar = function (array, numItemsFila) {
    if (array.length > 0) {
      var filas = [];
      var fila = [];
      var contNumItemF = 1;
      for (var i = 0; i < array.length; i++) {
        if (i === (array.length - 1)) {
          fila.push(array[i]);
          filas.push(fila);
          break;
        } else if (contNumItemF < numItemsFila) {
          fila.push(array[i]);
          contNumItemF++;
        } else {
          fila.push(array[i]);
          filas.push(fila);
          fila = [];
          contNumItemF = 1;
        }
      }
    }
    console.log("Array agrupado");
    console.log(filas);
    return filas;
  };

//  $ctrl.results = agrupar($ctrl.results, 4);
  $ctrl.filas = agrupar($ctrl.results, 2);

//  $scope.$watch(function () {
//            return $mdMedia('xs') || $mdMedia('sm');
//        }, function (wantsFullScreen) {
//            $scope.customFullscreen = (wantsFullScreen === true);
//        });

  $ctrl.viewRestaurant = function (restaurant) {
    $ctrl.restaurant = restaurant;
    $ctrl.configStars.valor = $ctrl.restaurant.calificationTotal;

//    $ctrl.filas = agrupar($ctrl.results, 2);
    $ctrl.seeRestaurant = true;
  };
  
  $ctrl.closeRestaurant = function(){
    $ctrl.seeRestaurant = false;
//    $ctrl.showList = 
  };
  
  
}