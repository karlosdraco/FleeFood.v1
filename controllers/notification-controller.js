app.controller("order-controller", ['$scope', '$rootScope','RestService','$routeParams',function($scope, $rootScope,RestService, $routeParams){

    var loadTime = 5000, //Load the data every second
    errorCount = 0, //Counter for the server errors
    loadPromise; //Pointer to the promise created by the Angular $timout service
    $scope.id;
    $scope.reportCount;
    $scope.foodModal = 0;
    $scope.orderFunc = 0;
    
    var getData = function(){
        RestService.getFeed().then(function(response){
            $scope.feed = response.data;
            $scope.id = $rootScope.data.id;
            //$scope.viewFood($scope.feed);
            errorCount = 0;
            nextLoad();
        }).catch(function() {
            $scope.feed = 'Server error';
            nextLoad(++errorCount * 2 * loadTime);
        });
    }

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
    
   
        var cancelNextLoad = function(){
            $timeout.cancel(loadPromise);
        }

        var nextLoad = function(mill){
            mill = mill || loadTime;

            //Always make sure the last timeout is cleared before starting a new one
            cancelNextLoad();
            loadPromise = $timeout(getData, mill);
        }

        //Start polling the data from the server
        getData();

        //Always clear the timeout when the view is destroyed, otherwise it will keep polling and leak memory
        $scope.$on('$destroy', function() {
        cancelNextLoad();
        });

        $scope.data = 'Loading...';

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


}]);