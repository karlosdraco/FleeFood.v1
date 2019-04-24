app.controller("status-controller", ['$scope', 'RestService', '$timeout', function($scope, RestService, $timeout){

    var loadTime = 5000, //Load the data every second
    errorCount = 0, //Counter for the server errors
    loadPromise; //Pointer to the promise created by the Angular $timout service

        var getData = function(){
            RestService.userPost().then(function(response){
            $scope.feed = response.data;
            errorCount = 0;
            nextLoad();
        }).catch(function() {
            $scope.feed = 'Server error';
            nextLoad(++errorCount * 2 * loadTime);
        });
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