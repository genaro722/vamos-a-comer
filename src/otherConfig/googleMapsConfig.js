angular.module('app').config(function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
//    creada con seront.nmmc@gmail.com
    key: 'AIzaSyCsyg6Ws7wT9dTz2eBCdXKuzJ92tFb1GTs',
    v: '3.20', // defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});
