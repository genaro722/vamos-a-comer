angular
        .module('app')
        .component('dashboardRestaurante', {
            templateUrl: 'app/restaurante/dashboard.html',
            controller: dashboardRestauranteCtrl
        });

function dashboardRestauranteCtrl($q, $timeout, $log, $mdBottomSheet, $scope, $mdDialog, $element, $http) {

    var $ctrl = this;
    $ctrl.config = {};
    $ctrl.todos = true;
    $ctrl.config.beAble = [{able: false, numero: 1}, {able: true, numero: 2}, {able: true, numero: 3}];
    $ctrl.config.selectedIndex = 0;
    $ctrl.status = '  ';
    $ctrl.customFullscreen = false;
    $http.get('app/data/platos.json').success(function (data) {
        console.log(data);
        $ctrl.toppings = data;
    });
    $http.get('app/data/combos.json').success(function (c) {
        console.log(c);
        $ctrl.combos = c;
    });
    $ctrl.hola = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    $ctrl.goTo = function (numb, item, more) {
        numb = numb + more;
        $ctrl.comida = item.name;
        console.log(numb);
        for (var i = 0; i < $ctrl.config.beAble.length; i++) {
//            if ($ctrl.config.beAble[i].numero <= numb) {
            $ctrl.config.beAble[i].able = false;
//            } else {
//                $ctrl.config.beAble[i].able = true;
//            }
        }
        $ctrl.config.selectedIndex = numb;
    };

    $ctrl.filtrando = function () {
        if ($ctrl.filtro === '0') {
            $ctrl.todos = true;
        } else if ($ctrl.filtro === '1') {
            $ctrl.todos = false;
            $ctrl.algunos = true;
        } else {
            $ctrl.todos = false;
            $ctrl.algunos = false;
        }
    };

    $ctrl.habilitar = function (categoria) {
        if (categoria.porcentaje >= 50) {

        } else {
            alert("Debe Completar al menos 50% de su categoria");
            categoria.wanted = false;
        }
    };

    $ctrl.limpiar = function () {
        $ctrl.filtro = '0';
        $ctrl.search = '';
        $ctrl.filtrando();
    };

    $ctrl.alert = '';
    $ctrl.showListBottomSheet = function (numb, objetos, nombre) {
        var pagina = "";
        if (numb === 1) {
            pagina = 'app/components/modals/bottom-sheet-list.html';
            objetos = [];
            nombre = '';
        }
        if (numb === 2) {
            pagina = 'app/components/modals/objetos.html';
        }
        $ctrl.alert = '';
        $mdBottomSheet.show({
            locals: {
                objetos: objetos,
                nombre: nombre
            },
            templateUrl: pagina,
            controller: 'ListBottomSheetCtrl'
        }).then(function (clickedItem) {
            if (clickedItem['name'] === 'Plato') {
                $ctrl.agregarModal();
            }
//            $ctrl.alert = clickedItem['name'] + ' clicked!';
        });
    };

    $ctrl.agregarModal = function (ev) {
        $mdDialog.show({
            locals: {
                $element: $element
            },
            controller: DialogController,
            templateUrl: 'app/components/modals/agregarModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        console.log("AGREGAR");
    };

    $ctrl.dialogoEdit = function () {
        alert("Ventana modal para editar nombre y descripcion");
    };
//    *****AUTOCOMPLETE***
    $ctrl.simulateQuery = true;
    $ctrl.isDisabled = false;

    // list of `state` value/display objects
    $ctrl.states = loadAll();
    $ctrl.querySearch = querySearch;
    $ctrl.selectedItemChange = selectedItemChange;
    $ctrl.searchTextChange = searchTextChange;
    $ctrl.newState = newState;

    function newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? $ctrl.states.filter(createFilterFor(query)) : $ctrl.states,
                deferred;
        if ($ctrl.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

        return allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    }
    
    $scope.vegetables = ['Corn', 'Onions', 'Kale', 'Arugula', 'Peas', 'Zucchini'];
    $scope.searchTerm;
    $scope.clearSearchTerm = function () {
        $scope.searchTerm = '';
    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $element.find('input').on('keydown', function (ev) {
        ev.stopPropagation();
    });
}
angular.module('app').controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet, objetos, nombre) {
    $scope.nombre = nombre;
    $scope.items2 = [
        {name: 'Plato', icon: 'fa-cutlery'},
        {name: 'Combo', icon: 'fa-shopping-basket'},
        {name: 'Bebida', icon: 'fa-coffee'}
    ];
    $scope.items = objetos;
    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items2[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});
function DialogController($scope, $mdDialog, $element) {
    $scope.vegetables = ['Corn', 'Onions', 'Kale', 'Arugula', 'Peas', 'Zucchini'];
    $scope.searchTerm;
    $scope.clearSearchTerm = function () {
        $scope.searchTerm = '';
    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $element.find('input').on('keydown', function (ev) {
        ev.stopPropagation();
    });

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}