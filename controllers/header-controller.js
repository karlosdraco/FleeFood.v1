app.controller('header-controller', ['$scope','$http','$cookie', function($scope, $http, $cookie){
  $scope.showDropdown = 0;

    $scope.dropToggle = function(){
        $scope.showDropdown++;

        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }

    $scope.logout = function(){
        $http({
            method: 'POST',
            url: 'http://localhost/fleefood_API/logout',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        }).then(function(response){
            $scope.error = response.data;
           
            if(!$scope.error.error){
                //$window.location.href = '#!/home';
                window.location.href = "/?#!/";
            }else{
                $scope.showError = true;
            }
        });
    }
    
}]);