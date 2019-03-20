app.controller("profile-controller", ['$scope', 'RestService','$cookies', function($scope, RestService, $cookies){

    if($cookies.get('SNID')){
        RestService.getUser().then(function(response){
            $scope.profile = response.data;
        });
    }else{
        location.href="/";
    }

   
}]);