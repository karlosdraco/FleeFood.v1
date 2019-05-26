app.controller("feed-controller", ['$scope', '$rootScope','RestService', '$timeout', function($scope, $rootScope,RestService, $timeout){

    var loadTime = 5000, //Load the data every second
    errorCount = 0, //Counter for the server errors
    loadPromise; //Pointer to the promise created by the Angular $timout service
    $scope.id;
    $scope.reportCount;
    $scope.foodModal = 0;
    
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
        $scope.viewedFood = $scope.feed[$scope.foodIndex];
        $scope.foodModalOn();
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

}]);