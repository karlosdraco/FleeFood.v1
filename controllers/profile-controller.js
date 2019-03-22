app.controller("profile-controller", ['$scope', 'RestService','$cookies', function($scope, RestService, $cookies){
    $scope.showModal = 0;
    $scope.user = {};
    
    $scope.modal = function(){
        return $scope.showModal = 1;
    }
    
    if($cookies.get('auth_token')){
        RestService.getUserName().then(function(response){
            $scope.profile = response.data;
        });
    }else{
        location.href="/";
    }

    $scope.updateProfile = function(){
        RestService.updateUser().then(function(response){
            $scope.error = response.data;
        });
    }
}]);