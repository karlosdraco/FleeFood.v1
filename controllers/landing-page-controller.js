app.controller('landing-page-controller', ['$scope','$rootScope','$cookies', function($scope, $rootScope,$cookies){
    $scope.showSignUp = 1;
    $scope.showSignIn = 0;

    $scope.card = [];
    $scope.card[0] = 1;
    
    $scope.userCardSelector = function(index){

        for(var i = 0; i < 2; i++){
            $scope.card[i] = 0;
            if(i == index){
                $scope.card[i] = 1;
            }else{
                $scope.card[i] = 0;
                $rootScope.showSignUpErr = $scope.card[i];
                $rootScope.showError = $scope.card[i];
            }
        }
    }

    /*if($cookies.get('auth_token')){
        location.href="/fleefood.v1/#!/home";
    }*/
}]);