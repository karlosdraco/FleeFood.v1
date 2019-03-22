app.controller('header-controller', ['$scope','RestService','$cookies',function($scope, RestService, $cookies){
  $scope.showDropdown = 0;
  $scope.showUserHeaderIcon = 0;
  

    if($cookies.get('auth_token')){
        $scope.showUserHeaderIcon = 1;
        RestService.getUser().then(function(response){
            $scope.name = response.data;
        });
    }else{
        $scope.showUserHeaderIcon = 0;
    }

    $scope.dropToggle = function(){
        $scope.showDropdown++;

        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }

    $scope.logout = function(){
        RestService.logOut().then(function(response){
            $scope.error = response.data;
           
            if(!$scope.error.error){
                //$window.location.href = '#!/home';
                location.href = "/";
            }else{
                $scope.showError = true;
            }
        });
    }
    
}]);