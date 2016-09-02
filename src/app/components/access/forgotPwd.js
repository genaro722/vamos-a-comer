angular.module('app')
        .component('forgotPwdComponent', {templateUrl: 'app/containers/access/forgotPwd.html', controller: forgotPwdCtrl})
        .component('resetPwdComponent', {templateUrl: 'app/containers/access/resetPwd.html', controller: forgotPwdCtrl});

function forgotPwdCtrl($scope, $http, $window, baseUrl) {
  console.log("resetPass");
  console.log($window);
  console.log($window.location);
  console.log($window.location.search);
  $scope.resetPasswordRequest = function () {
    console.log($scope.email);
    var par = {
      email: $scope.email
    };
    $http.post(baseUrl.url + "resetting/reset-password", par).then(function success(response) {
      console.log("Success");
      console.log(response);
    }, function error(response) {
      console.log("error");
      console.log(response);
    });
  };
  $scope.resetPassword = function () {
    console.log($scope.pass);
    console.log($scope.pass2);
    var par = {
      pass: $scope.pass,
      pass2: $scope.pass2
    };
    $http.post(baseUrl.url + "resetpasswords/{token}", par).then(function success(response) {
      console.log("Success");
      console.log(response);
    }, function error(response) {
      console.log("error");
      console.log(response);
    });
  };
}
