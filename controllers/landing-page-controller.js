app.controller('landing-page-controller', ['$scope','$http', function($scope, $http){
    $scope.showSignUp = 1;
    $scope.showSignIn = 0;
    
    var toggleBtn = document.getElementsByClassName('toggle-btn');
    var signupToggle = document.getElementById('sign-up-toggle');
    var loginToggle = document.getElementById('login-in-toggle');

    
}]);