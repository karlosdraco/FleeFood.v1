app.controller("signup-controller", ['$scope','$rootScope','RestService',function($scope,$rootScope,RestService){
    $scope.user = {};
    $rootScope.showSignUpErr = 0;

    $scope.submitSignUpForm = function(){
        var form = document.getElementById('signupForm');

        RestService.signupUser($scope.user).then(function(response){
            $scope.errors = response.data;
            if($scope.errors.errorFlag){
                $rootScope.showSignUpErr = 1;
            }else{
                $rootScope.showSignUpErr = 0;
                form.reset();
            }
            form.reset();
        })
        
    }


}]);