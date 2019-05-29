app.controller("order-controller", ['$scope', '$rootScope','RestService',function($scope, $rootScope,RestService){
   
    $scope.order = {};
    $scope.food = {};
    $scope.error = 0;
    $scope.accept = 1;
    $scope.decline = 0;
   
    $scope.orderRequest = function(){
        
        $scope.order = {
            foodId: $rootScope.viewedFood.id,
            userId: $rootScope.viewedFood.user_id,
            buyerId: $rootScope.data.id
        }

        RestService.orderRequest($scope.order).then(function(response){
            $scope.orderCallBack = response.data;

            if($scope.orderCallBack.error == true){
                $scope.error = 1;
                setInterval(function(){
                    $scope.error = 0;
                }, 3000)
            }else{
                alert("Order requested");
            }
        });
    }

    //$rootScope.viewOrderRequest = function(){
    RestService.viewOrders().then(function(response){
        $scope.data = response.data;
    });
    //}
    
    $scope.orderIndex = 0;
    $scope.updateRequest = function(element, index){
        
        $scope.orderIndex = $scope.data.indexOf(index);
        $rootScope.getOrder = $scope.data[$scope.orderIndex];
           
        $scope.food = {
                request: element,
                foodId: $rootScope.getOrder.food_id,
                userId: $rootScope.getOrder.user_id,
                buyerId: $rootScope.getOrder.buyer_id
        }

            RestService.requestStatus($scope.food).then(function(response){
                $scope.request = response.data;
            })
    }

}]);