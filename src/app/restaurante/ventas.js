angular
        .module('app')
        .component('ventasRestaurante', {
            templateUrl: 'app/restaurante/ventas.html',
            controller: dashboardRestauranteCtrl
        });

function dashboardRestauranteCtrl($q, $timeout, $log, $mdBottomSheet, $scope, $mdDialog, $element, $http) {
    
}