app.controller("feed-controller", ['$scope', '$rootScope','RestService', '$timeout', function($scope, $rootScope,RestService, $timeout){

    $scope.id;
    $scope.reportCount;
    $scope.foodModal = 0;
    $scope.showReportModal = 0;
    $scope.orderFunc = 0;
    $scope.isFree = 0;
    $scope.showFollowFeed = true;

    $rootScope.discover = function(){
        RestService.getFeed().then(function(response){
            $scope.feed = response.data;
            $scope.id = $rootScope.data.id;
            //$scope.viewFood($scope.feed);
        }).catch(function() {
            $scope.feed = 'Server error';
        });
    }

    $rootScope.followingPost = function(){
        RestService.getFollowingFeed().then(function(response){
            $scope.feed = response.data;
            $scope.id = $rootScope.data.id;
          
            if($scope.feed.count == 0){
                $scope.showFollowFeed = false;
            }
           
        }).catch(function() {
            $scope.feed = 'Server error';
        });
    }
    

    $scope.foodModalOn = function(){
        $scope.foodModal++;
        if($scope.foodModal > 1){
            $scope.foodModal = 0;
        }
    }

    $scope.key = ($event) => {
        if($event.keyCode == 27){
            $scope.foodModal--;
        }
        //console.log('got key ' + $event.code);
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

    $scope.reportModalOn = function(){
        $scope.showReportModal++;
        if($scope.showReportModal > 1){
            $scope.showReportModal = 0;
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

        $scope.reportModal = function(index){
            var feedIndex = $scope.feed.indexOf(index);
            var listOrder = $scope.feed[feedIndex];
            $scope.reportModalOn();
        }

        $scope.free = "FREE";
        $scope.freeSign = function(index){
            var freeIndex = $scope.feed.indexOf(index);
            var priceFree = $scope.feed[freeIndex];

            if(priceFree.food_price == 0.00){
                priceFree.food_price = $scope.free;
                return $scope.isFree == 1;
            }else{
                return $scope.isFree == 0;
            }
        }
}]);