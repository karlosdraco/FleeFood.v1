app.controller('header-controller', ['$scope','RestService','$cookies',function($scope, RestService, $cookies){
  $scope.showDropdown = 0;
  $scope.showUserHeaderIcon = 0;
  
    $scope.dropToggle = function(){
        $scope.showDropdown++;

        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }

    if($cookies.get('auth_token')){
        RestService.isloggedIn().then(function(response){
            $scope.data = response.data;
            $scope.showUserHeaderIcon = 1;
        });
            
    }else{
        $scope.showUserHeaderIcon = 0;
        location.href="/fleefood.v1/#!/";
    }

    $scope.logout = function(){
        RestService.logOut().then(function(response){
            $scope.error = response.data;
           
            if(!$scope.error.error){
                //$window.location.href = '#!/home';
                location.href = "/fleefood.v1";
            }else{
                $scope.showError = true;
            }
        });
    }
    
}]);