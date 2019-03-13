app.controller("login-controller", ['$scope','$http','$window',function($scope, $http, $window){
        $scope.user = {};
        $scope.showError = false;

        $scope.submitLoginForm = function(){
            $http({
                method: 'POST',
                url: 'https://cors-anywhere.herokuapp.com/http://fleefood.000webhostapp.com/login',
                data: $scope.user,
                headers : { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Credentials': 'true'
                } 
            }).then(function(response){
                $scope.error = response.data;
               
                if($scope.error.authenticated){
                    $window.location.href = '#!/profile';
                }else{
                    $scope.showError = true;
                }
            })
        }


}]);