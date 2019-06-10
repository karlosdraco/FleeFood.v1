app.controller('header-controller', ['$scope','$rootScope','RestService','$cookies','$window',function($scope,$rootScope,RestService, $cookies,$window){
  $scope.showDropdown = 0;
  $scope.showUserHeaderIcon = 0;
  $scope.showHeaderNav = 0;
 
    $scope.dropToggle = function(){
        $scope.showDropdown++;

        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }

    if($cookies.get('auth_token')){
        RestService.isloggedIn().then(function(response){
            $rootScope.data = response.data;

            $rootScope.path = $scope.data.path;
            
            if($rootScope.data.loggedIn){
                $rootScope.loggedUser = 1;
                $scope.showUserHeaderIcon = 1;
                $scope.showHeaderNav = 1;
                $window.location.href="/fleefood.v1/#!/home";
            }
        });
            
    }else{
        $scope.showUserHeaderIcon = 0;
        $window.location.href="/fleefood.v1/#!/";
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