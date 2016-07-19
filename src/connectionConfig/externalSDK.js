//  module.export = externalSDK;
angular.module('app').run(function externalSDK() {
//  (function (d, s, id) {
//    var js;
//    var fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {
//      return;
//    }
//    js = d.createElement(s);
//    js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));
  function h(d, s, id) {
    var js;
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
}).run(['$animate', '$log',
  function ($animate, $log) {
    $log.info('Animations enabled: ', true);
    $animate.enabled(true);
  }]);

