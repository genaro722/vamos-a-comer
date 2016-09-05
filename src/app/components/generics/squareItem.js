angular.module('app')
        .component('squareItem', {
            templateUrl: 'app/parts/squareItem.html',
            controller: squareItemCtrl,
            bindings: {
                item: '=',
                config: '<'
            }
        });

function squareItemCtrl() {
    var $ctrl = this;
    
}


