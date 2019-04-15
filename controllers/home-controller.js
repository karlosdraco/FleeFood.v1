app.controller('home-controller', ['$scope', 'RestService','$http', function($scope, RestService, $http){
     
    $scope.showDropdown = 0;
    
    $scope.dropdown = function(){
        $scope.showDropdown++;
        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }


}]);