app.controller("signup-controller", ['$scope','$rootScope','RestService',function($scope,$rootScope,RestService){
    $scope.user = {};
    $scope.showSignUpErr = 0;
    $scope.showSuccess = 0;


    $scope.submitSignUpForm = function(){
        var form = document.getElementById('signupForm');

        RestService.signupUser($scope.user).then(function(response){
            $scope.signup = response.data;

            if($scope.signup.errorFlag){
                $scope.showSignUpErr = 1;
            }else{
                $scope.showSignUpErr = 0;
                $scope.showSuccess = 1;
                form.reset();
            }

            //form.reset();
        })
        
    }


}]);