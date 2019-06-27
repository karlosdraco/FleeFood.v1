app.controller("login-controller", ['$scope','$rootScope','RestService','$window',function($scope,$rootScope,RestService, $window){
        $scope.user = {};
        $rootScope.showError = 0;
        $scope.userHeaderIcon = 0;

        $scope.submitLoginForm = function(){
            RestService.loginUser($scope.user).then(function(response){
                $scope.error = response.data;
               
                if($scope.error.authenticated){
                    $window.location.href = '/fleefood.v1/#!home';
                    $window.location.reload();
            
                }else{
                    $rootScope.showError++;
                }
            });
        }

}]);