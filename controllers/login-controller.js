app.controller("login-controller", ['$scope','$http','$window',function($scope, $http, $window){
        $scope.user = {};
        $scope.showError = false;
        $scope.userHeaderIcon = 0;

        $scope.submitLoginForm = function(){
            $http({
                method: 'POST',
                url: 'http://localhost/fleefood_API/login',
                data: $scope.user,
                withCredentials: true,
                headers : { 
                    'Content-Type': 'application/json'
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