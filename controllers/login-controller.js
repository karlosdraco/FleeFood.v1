app.controller("login-controller", ['$scope','RestService','$window',function($scope,RestService, $window){
        $scope.user = {};
        $scope.showError = 0;
        $scope.userHeaderIcon = 0;

        $scope.submitLoginForm = function(){
            RestService.loginUser($scope.user).then(function(response){
                $scope.error = response.data;
               
                if($scope.error.authenticated){
                    $window.location.href = '/fleefood.v1/#!home';
                    $window.location.reload();
            
                }else{
                    $scope.showError++;
                }
            });
        }

}]);