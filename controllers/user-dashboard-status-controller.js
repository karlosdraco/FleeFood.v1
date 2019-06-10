app.controller("status-controller", ['$scope', 'RestService', '$rootScope', function($scope, RestService, $rootScope){
    $scope.showMyPost = 1;
    $scope.update = {};

        RestService.userPost().then(function(response){
            $rootScope.feed = response.data;
            
            if($rootScope.feed.count == 0){
                $scope.showMyPost = 0;
            }
        }).catch(function() {
            $rootScope.feed = 'Server error';
        });

}]);