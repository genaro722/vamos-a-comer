angular.module('app')
        .component('login1', {templateUrl: 'app/access/login_1.html',
            controller: loginCtrl})
        .component('principal', {templateUrl: 'app/access/principal.html',
            controller: loginCtrl});

function loginCtrl() {
    var $ctrl = this;
    $ctrl.imagenes = [
        '../app/img/logo/logo-1.jpg', '../app/img/logo/logo-2.png', '../app/img/logo/logo-3.jpg', '../app/img/logo/logo-4.jpg',
        '../app/img/logo/logo-5.jpg', '../app/img/logo/logo-6.png', '../app/img/logo/logo-7.jpg', '../app/img/logo/logo-9.jpg'
    ];
    $ctrl.login = true;
    $ctrl.showLogin = function () {
        $ctrl.login=!$ctrl.login;
    };
    console.log($ctrl.imagenes);
}