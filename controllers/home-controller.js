app.controller('home-controller', ['$scope', 'RestService', function($scope, RestService){
     
    $scope.showDropdown = 0;
    

    $scope.dropdown = function(){
        $scope.showDropdown++;
        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }


}]);