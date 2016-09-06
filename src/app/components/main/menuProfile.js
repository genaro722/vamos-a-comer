angular
  .module('app')
  .component('menuProfile', {
    templateUrl: 'app/components/main/menuProfile.html',
    controller: menuProfileCtrl,
    bindings: {
      menu: "="
    }
  });

function menuProfileCtrl() {
  
};
