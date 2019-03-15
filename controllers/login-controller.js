app.controller("login-controller", ['$scope','$http','$window',function($scope, $http, $window){
        $scope.user = {};
        $scope.showError = false;

        $scope.submitLoginForm = function(){
            $http({
                method: 'POST',
                url: 'http://fleefood.000webhostapp.com/login',
                data: $scope.user,
                withCredentials: true,
                headers : { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                } 
            }).then(function(response){
                $scope.error = response.data;
               
                if($scope.error.authenticated){
                    $window.location.href = '#!/profile';
                }else{
                    $scope.showError = true;
                }
            });
        }


}]);