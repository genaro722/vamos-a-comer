angular
        .module('app')
        .component('tabMultiple', {
            templateUrl: 'app/restaurante/tab-multiple.html',
            controller: tabMultipleCtrl,
            bindings: {
                config: '=',
                categoria: '=',
                comida: '='
            }
        });

function tabMultipleCtrl($q, $timeout, $log) {

    var $ctrl = this;
    $ctrl.config = {};
    $ctrl.todos = true;
    $ctrl.config.beAble = [{able: false, numero: 1}, {able: true, numero: 2}, {able: true, numero: 3}];
    $ctrl.config.selectedIndex = 0;
    $ctrl.toppings = [
        {name: 'Comida Para niños', wanted: true, porcentaje: 80, price: 1000},
        {name: 'Bebidas', wanted: true, porcentaje: 70, price: 1500},
        {name: 'Pastas', wanted: true, porcentaje: 85, price: 3000},
        {name: 'Granos', wanted: false, porcentaje: 20, price: 500},
        {name: 'Sausage', wanted: false, porcentaje: 30, price: 2970},
        {name: 'Parrillas', wanted: true, porcentaje: 90, price: 1450},
        {name: 'Black Olives', wanted: true, porcentaje: 75, price: 5000},
        {name: 'Desayunos', wanted: false, porcentaje: 20, price: 6300},
        {name: 'Almuerzos', wanted: false, porcentaje: 45, price: 4560},
        {name: 'Cena', wanted: true, porcentaje: 80, price: 3420},
        {name: 'Green Peppers', wanted: false, porcentaje: 20, price: 950}
    ];
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
            $ctrl.algunos=true;
        } else {
            $ctrl.todos = false;
            $ctrl.algunos=false;
        }
    };

    $ctrl.habilitar = function (categoria) {
        if (categoria.porcentaje > 50) {

        } else {
            alert("Debe Completar al menos 50% de su categoria");
            categoria.wanted = false;
        }
    };

    $ctrl.limpiar=function(){
        $ctrl.filtro='0';
        $ctrl.buscar='';
        $ctrl.filtrando();
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
}
