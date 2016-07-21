angular.module('app')
        .factory("Location", ["Restangular", lf])
        .factory("Studio", ["Restangular", sf])
        .factory("Client", ["Restangular", cf]);

function lf(Restangular) {
  return Restangular.all("locations");
}

function sf(Restangular) {
  return Restangular.all("studios");
}

function cf(Restangular) {
  return Restangular.all("clients");
}
