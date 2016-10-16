angular
        .module('app')
        .component('contactanos', {
            templateUrl: 'app/general/contactanos.html',
            controller: contactanosCtrl
        });

function contactanosCtrl() {
    var $ctrl = this;
    $ctrl.imagenes = [
        '../app/img/logo/logo-1.jpg', '../app/img/logo/logo-2.png', '../app/img/logo/logo-3.jpg', '../app/img/logo/logo-4.jpg',
        '../app/img/logo/logo-5.jpg', '../app/img/logo/logo-6.png', '../app/img/logo/logo-7.jpg', '../app/img/logo/logo-9.jpg'
    ];
}