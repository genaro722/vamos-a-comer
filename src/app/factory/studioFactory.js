angular.module('app')
        .factory("Studio", ["Restangular", cf]);
function cf(Restangular){
    return Restangular.all("studios");
};
