app.controller("profile-controller", ['$scope', 'RestService','$cookies', function($scope, RestService, $cookies){
    $scope.showModal = 0;
    $scope.user = {};
    
    $scope.modal = function(){
        $scope.showModal++;
        if($scope.showModal > 1){
            $scope.showModal = 0;
        }
    }
    
    if($cookies.get('auth_token')){
        RestService.getUserName().then(function(response){
            $scope.profile = response.data;
        });
    }else{
        location.href="/";
    }

    $scope.updateProfile = function(){

        RestService.updateUser($scope.user).then(function(response){
            $scope.error = response.data;
            
            if($scope.error.error == false){
                alert($scope.error.message);
            }else{
                alert("There's an error updating your account");
            }
        });
    }
}]);