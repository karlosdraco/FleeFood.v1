app.controller("signup-controller", ['$scope','$http','$window',function($scope, $http, $window){
    $scope.user = {};
    $scope.showSignUpErr = false;

    $scope.submitSignUpForm = function(){
        var form = document.getElementById('signupForm');
        
        $http({
            method: 'POST',
            url: 'http://localhost/fleefood_API/signup',
            data: $scope.user,
            headers : { 
                'Content-Type': 'application/json'
            } 
        }).then(function(response){
            $scope.errors = response.data;
            if($scope.errors.errorFlag){
                $scope.showSignUpErr = true;
            }else{
                $scope.showSignUpErr = false;
                form.reset();
            }
            form.reset();
        })
        
    }


}]);