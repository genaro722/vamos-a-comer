angular.module('app')
        .component('studioItemComponent', {
            templateUrl: 'app/components/studioItem.html',
            controller: studioItemCtrl,
            bindings: {
                studio: '='
            }
        });

function studioItemCtrl($scope, Client, Restangular) {
    var $ctrl = this;
    $ctrl.valoracion = 3;
    $ctrl.loadFavorite = false;
 $ctrl.actividad = false;
    
    $ctrl.starConfig = {
      style: ["white-text"],
      styleIcon: ["fa-2x"],
      valor: 3,
      mostrarValor: false
    };

    $ctrl.favorite = function () {
        $ctrl.loadFavorite = true;
        var sp = localStorage.getItem("pase.fit.storage-client_iri").split("/");
        Client.get('', {id: sp[sp.length - 1]})
                .then(
                        function success(response) {
                            console.log(response);
                            response['hydra:member'][0].studios.push("/api/studios/" + $ctrl.studio.id);
                            console.log(response['hydra:member'][0].studios);
                            $ctrl.client = response;
                            Restangular.all('clients/' + sp[sp.length - 1]).customPUT(response['hydra:member'][0])

//                            $ctrl.client.put()
                                    .then(
                                            function success(response) {
                                                $ctrl.loadFavorite = false;
                                                console.log(response);
                                            }, function error(resp) {
                                        $ctrl.loadFavorite = false;
                                        console.log(resp);
                                    });
                        },
                        function error(resp) {
                            $ctrl.loadFavorite = false;
                            console.log(resp);
                        });
//        Restangular.all('clients/' + sp[sp.length-1]).customPUT(contract)
    };
}


