app.controller("signup-controller", ['$scope','RestService',function($scope,RestService){
    $scope.user = {};
    $scope.showSignUpErr = false;

    $scope.submitSignUpForm = function(){
        var form = document.getElementById('signupForm');

        RestService.signupUser($scope.user).then(function(response){
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