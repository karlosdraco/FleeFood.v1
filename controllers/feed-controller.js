app.controller("feed-controller", ['$scope', '$rootScope','RestService', '$timeout', function($scope, $rootScope,RestService, $timeout){

    $scope.id;
    $scope.reportCount;
    $scope.foodModal = 0;
    $scope.orderFunc = 0;
    
    
        RestService.getFeed().then(function(response){
            $scope.feed = response.data;
            $scope.id = $rootScope.data.id;
            //$scope.viewFood($scope.feed);
        }).catch(function() {
            $scope.feed = 'Server error';
        });
       
    $scope.foodModalOn = function(){
        $scope.foodModal++;
        if($scope.foodModal > 1){
            $scope.foodModal = 0;
        }
    }

    $scope.foodIndex = 0;
    $scope.viewFood = function(food){
        $scope.foodIndex = $scope.feed.indexOf(food);
        $rootScope.viewedFood = $scope.feed[$scope.foodIndex];
        $scope.foodModalOn();

        if($rootScope.data.id != $rootScope.viewedFood.user_id){
            $scope.orderFunc = 1;
        
        }else{
            $scope.orderFunc = 0;
        }
    }
    

        $scope.reportButton = function(index){
            var feedIndex = $scope.feed.indexOf(index);
            var listOrder = $scope.feed[feedIndex];
    
            if($rootScope.data.id != listOrder.user_id){
                return true;
            }else{
                return false;
            }
        }

        $scope.free = "FREE";
        $scope.freeSign = function(index){
            var freeIndex = $scope.feed.indexOf(index);
            var priceFree = $scope.feed[freeIndex];

            if(priceFree.food_price == 0){
                priceFree.food_price = $scope.free;
            }
        }
}]);