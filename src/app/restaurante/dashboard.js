angular
        .module('app')
        .component('dashboardRestaurante', {
            templateUrl: 'app/restaurante/dashboard.html',
            controller: dashboardRestauranteCtrl
        });

function dashboardRestauranteCtrl($q, $timeout, $log) {

    var $ctrl = this;
    
    $ctrl.goTo = function (numb) {
        for (var i = 0; i < $ctrl.config.beAble.length; i++) {
            if ($ctrl.config.beAble[i].numero<=numb) {
                $ctrl.config.beAble[i].able=false;
            }else{
                $ctrl.config.beAble[i].able=true;
            }
        }
        $ctrl.config.selectedIndex=numb-1;
        console.log($ctrl.config.selectedIndex);
    };

}
