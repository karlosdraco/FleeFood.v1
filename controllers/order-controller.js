app.controller("order-controller", ['$scope', '$rootScope','RestService','$routeParams','$route',function($scope, $rootScope,RestService, $routeParams,$route){
   
    $scope.order = {};
    $scope.food = {};
    $scope.error = 0;
    $scope.requestStatusFeed = false;
    $scope.accept = 1;
    $scope.decline = 0;
    $scope.claimed = 2;
    $scope.cancel = 3;
    $scope.qty = 1;

    //$rootScope.viewOrderRequest = function(){
        if($rootScope.data.id != $routeParams.id){
            $scope.requestStatusFeed = false;
            $scope.orderMsg = "Order feed private";
        }else{
            RestService.viewOrders().then(function(response){
                $scope.data = response.data;
                $rootScope.globalOrderId = $scope.data.id;
                $scope.requestStatusFeed = true;
            });
        }
    //}

    $scope.orderRequest = function(qty){
            
        $scope.order = {
               foodId: $rootScope.viewedFood.id,
               userId: $rootScope.viewedFood.user_id,
               buyerId: $rootScope.data.id,
               quantity: qty,
               price: $rootScope.viewedFood.food_price
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
 
    $scope.orderIndex = 0;
    $scope.updateRequest = function(element, index){
        
        $scope.orderIndex = $scope.data.indexOf(index);
        $rootScope.getOrder = $scope.data[$scope.orderIndex];

        $scope.food = {
                request: element,
                foodId: $rootScope.getOrder.food_id,
                userId: $rootScope.getOrder.user_id,
                buyerId: $rootScope.getOrder.buyer_id,
                orderId: $rootScope.getOrder.id
        }
           
        RestService.requestStatus($scope.food).then(function(response){
            $scope.request = response.data;
        });
        $route.reload();
    }

    $scope.requestButton = function(index){
        var listIndex = $scope.data.indexOf(index);
        var listOrder = $scope.data[listIndex];

        if(listOrder.request == "accepted"){
            return false;
        }else{
            return true;
        }
    }

}]);