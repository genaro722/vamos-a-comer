angular.module('app')
        .factory("Client", ["Restangular", cf]);
function cf(Restangular){
    return Restangular.all("clients");
};
