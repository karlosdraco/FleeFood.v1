app.controller("profile-controller", ['$scope', '$http', function($scope, $http){

    $scope.bio = {};
    
    $http.get("model/test.model.json").then(function(response){
        $scope.data = response.data;
    });

    /*$scope.user_info_filter = function(type){
        if(type == 'overview'){
            $scope.bio = [{
                bio: $scope.data[0].bio,
                age: $scope.data[0].age,
                bdate: $scope.data[0].bdate,
                gender: $scope.data[0].gender,
                contact: $scope.data[0].contact
            }]
        }

        else{
            $scope.bio = [{
                country:  $scope.data[0].country,
                addressLine1: $scope.data[0].addressLine1,
                addressLine2: $scope.data[0].addressLine2,
                zipCode: $scope.data[0].zipCode,
            }]
        }
    }*/


}]);