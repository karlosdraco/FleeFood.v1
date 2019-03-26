app.controller("profile-controller", ['$scope', 'RestService','$cookies', '$route', '$routeParams', function($scope, RestService, $cookies, $route, $routeParams){
    $scope.showModal = 0;
    $scope.showUpdate = 1;
    $scope.showFollow = 0;
    $scope.user = {};

    //CHECKING IF THERE'S A COOKIE
    if($cookies.get('auth_token')){

        RestService.isloggedIn().then(function(response){
            $scope.loggedUser = response.data;
        });

        RestService.getUserName().then(function(response){
            $scope.profile = response.data;
        });
    }
    
    //MODAL FUNCTIONALITY
    $scope.modal = function(){
        $scope.showModal++;
        if($scope.showModal > 1){
            $scope.showModal = 0;
        }
    }

    //FETCHING PROFILE DATA
    $scope.show_profile_update = function(){
        if($scope.loggedUser.firstname != $routeParams.name){
            $scope.showFollow = 1;
            return $scope.showUpdate = 0;
        }else{
            $scope.showFollow = 0;
            return $scope.showUpdate = 1;
        }
    }
    
    //UPDATE PROFILE DATA
    $scope.updateProfile = function(){

        RestService.updateUser($scope.user).then(function(response){
            $scope.error = response.data;
            $route.reload();
            if($scope.error.error == false){
                alert($scope.error.message);
            }else{
                alert("There's an error updating your account");
            }
        });
    }
}]);