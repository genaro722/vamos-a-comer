//module.exports = restConfig;
angular
  .module('app').config(['jwtInterceptorProvider','$httpProvider','RestangularProvider','$facebookProvider',restConfig]);

function restConfig(jwtInterceptorProvider, $httpProvider, RestangularProvider, $facebookProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', function (config) {
            // Skip authentication for any requests ending in .html
            if (config.url.substr(config.url.length - 5) === '.html') {
                return null;
            }
            return localStorage.getItem('pase.fit.storage-token');
        }];
    $httpProvider.interceptors.push('jwtInterceptor');
    //  Usar esta base cuando se pruebe arriba
    RestangularProvider.setBaseUrl('http://api.pase.fit/api');
    //  Usar esta base cuando se pruebe en local
//    RestangularProvider.setBaseUrl('http://api.pase.fit/app_dev.php/api/');

    //  Cambiar este id por el correspondiente
    $facebookProvider.setAppId('248498685285733');
    $facebookProvider.setPermissions("email,user_likes");
    $facebookProvider.setCustomInit({
        channelUrl: '//app.pase.fit/index.html#/access/login',
        xfbml: true
    });
}
