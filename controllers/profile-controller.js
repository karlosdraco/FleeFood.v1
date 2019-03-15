app.controller("profile-controller", ['$scope', '$http', function($scope, $http){

        $http({
            method: 'GET',
            url: 'http://localhost/fleefood_API/profile',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        }).then(function(response){
            $scope.profile = response.data;
        });
}]);