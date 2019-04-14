app.controller("post-controller",['$scope','RestService',function($scope,RestService){
    $scope.post = {};


    $scope.foodPost = function(){

        var form = document.getElementById('foodForm');

        RestService.foodPost($scope.post).then(function(response){
            $scope.data = response.data;
        })
        form.reset();
    }

    
}]);

