app.controller("status-controller", ['$scope', 'RestService', '$timeout', function($scope, RestService, $timeout){

        RestService.userPost().then(function(response){
            $scope.feed = response.data;
        }).catch(function() {
            $scope.feed = 'Server error';
        });


        

}]);