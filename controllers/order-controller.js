app.controller("order-controller", ['$scope', '$rootScope','RestService',function($scope, $rootScope,RestService){
    
    /*$scope.order = {
        foodId: $rootScope.viewedFood.id,
        userId: $rootScope.viewedFood.user_id,
        buyerId: $rootScope.data.id
    }
   
    $scope.orderRequest = function(){
        RestService.orderRequest($scope.order).then(function(response){
            $scope.data = response.data;
        });
    }*/

    //$rootScope.viewOrderRequest = function(){
        RestService.viewOrders().then(function(response){
            $scope.data = response.data;
        });
    //}

}]);