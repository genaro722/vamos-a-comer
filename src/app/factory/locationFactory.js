angular.module('app')
        .factory("Location", ["Restangular", cf]);
function cf (Restangular) {
    return Restangular.all("locations");
};
