app.controller('landing-page-controller', ['$scope','$cookies', function($scope, $cookies){
    $scope.showSignUp = 1;
    $scope.showSignIn = 0;

    if($cookies.get('SNID')){
        location.href="/#!home";
    }
}]);