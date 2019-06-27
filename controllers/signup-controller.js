app.controller("signup-controller", ['$scope','$rootScope','RestService',function($scope,$rootScope,RestService){
    $scope.user = {};
    $rootScope.showSignUpErr = 0;
    $scope.showSuccess = 0;


    $scope.submitSignUpForm = function(){
        var form = document.getElementById('signupForm');

        RestService.signupUser($scope.user).then(function(response){
            $scope.signup = response.data;

            if($scope.signup.errorFlag){
                $rootScope.showSignUpErr = 1;
            }else{
                $rootScope.showSignUpErr = 0;
                $scope.showSuccess = 1;
                form.reset();
            }

            //form.reset();
        })
        
    }


}]);