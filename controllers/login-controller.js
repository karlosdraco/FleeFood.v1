app.controller("login-controller", ['$scope','RestService',function($scope,RestService){
        $scope.user = {};
        $scope.showError = false;
        $scope.userHeaderIcon = 0;

        $scope.submitLoginForm = function(){
            RestService.loginUser($scope.user).then(function(response){
                $scope.error = response.data;
               
                if($scope.error.authenticated){
                    location.href = '#!/home';
                }else{
                    $scope.showError = true;
                }
            });
        }

}]);