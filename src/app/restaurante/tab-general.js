angular
        .module('app')
        .component('tabGeneral', {
            templateUrl: 'app/restaurante/tab-general.html',
            controller: tabGeneralCtrl,
            bindings: {
                config: '=',
                numero: '='
            }
        });

function tabGeneralCtrl($q, $timeout, $log) {

    var $ctrl = this;
    $ctrl.config={};
    $ctrl.config.beAble=[{able:false, numero:1},{able:true, numero:2},{able:true, numero:3},{able:true, numero:4}];
    $ctrl.config.selectedIndex=0;
    $ctrl.toppings = [
        {name: 'Pepperoni', wanted: true},
        {name: 'Sausage', wanted: false},
        {name: 'Black Olives', wanted: true},
        {name: 'Green Peppers', wanted: false}
    ];
    $ctrl.hola = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

    $ctrl.goTo = function (numb) {
        for (var i = 0; i < $ctrl.config.beAble.length; i++) {
            if ($ctrl.config.beAble[i].numero<=numb) {
                $ctrl.config.beAble[i].able=false;
            }else{
                $ctrl.config.beAble[i].able=true;
            }
        }
        $ctrl.config.selectedIndex=numb;
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
