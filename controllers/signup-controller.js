app.controller("signup-controller", ['$scope','$http','$window',function($scope, $http, $window){
    $scope.user = {};
    $scope.showSignUpErr = false;

    $scope.submitSignUpForm = function(){
        var form = document.getElementById('signupForm');
        
        $http({
            method: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/http://fleefood.000webhostapp.com/signup',
            data: $scope.user,
            headers : { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Credentials': 'true'
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