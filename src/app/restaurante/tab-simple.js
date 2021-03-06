angular
        .module('app')
        .component('tabSimple', {
            templateUrl: 'app/restaurante/tab-simple.html',
            controller: tabSimpleCtrl,
            bindings: {
                config: '=',
                categoria: '=',
                comida: '='
            }
        });

function tabSimpleCtrl($q, $timeout, $log) {

    var $ctrl = this;
    $ctrl.config = {};
    $ctrl.config.beAble = [{able: false, numero: 1}, {able: true, numero: 2}, {able: true, numero: 3}, {able: true, numero: 4}];
    $ctrl.config.selectedIndex = 0;
    $ctrl.toppings = [
        {name: 'Comida Para niños', wanted: true, porcentaje: 80},
        {name: 'Bebidas', wanted: true, porcentaje: 70},
        {name: 'Pastas', wanted: true, porcentaje: 85},
        {name: 'Granos', wanted: false, porcentaje: 20},
        {name: 'Sausage', wanted: false, porcentaje: 30},
        {name: 'Parrillas', wanted: true, porcentaje: 90},
        {name: 'Black Olives', wanted: true, porcentaje: 75},
        {name: 'Desayunos', wanted: false, porcentaje: 20},
        {name: 'Almuerzos', wanted: false, porcentaje: 45},
        {name: 'Cena', wanted: true, porcentaje: 80},
        {name: 'Green Peppers', wanted: false, porcentaje: 20}
    ];
    $ctrl.hola = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

    $ctrl.goTo = function (numb, item) {
        numb = numb + 2;
        $ctrl.categoria=item.name;
//        localStorage.getItem("pase.fit.storage-roles");
        localStorage.setItem("vamosacomer.storage-item", JSON.stringify(item));
        console.log(numb);
        for (var i = 0; i < $ctrl.config.beAble.length; i++) {
            if ($ctrl.config.beAble[i].numero <= numb) {
                $ctrl.config.beAble[i].able = false;
            } else {
                $ctrl.config.beAble[i].able = true;
            }
        }
        $ctrl.config.selectedIndex = numb;
    };

    $ctrl.habilitar = function (categoria) {
        if (categoria.porcentaje > 50) {

        } else {
//            alert("Debe Completar al menos 50% de su categoria");
            categoria.wanted = false;
        }
    };

    $ctrl.dialogoEdit = function () {
//        alert("Ventana modal para editar nombre y descripcion");
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
//        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
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
}
