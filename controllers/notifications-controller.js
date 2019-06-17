app.controller("notifications-controller", ['$scope', '$rootScope','RestService','$routeParams',function($scope, $rootScope,RestService, $routeParams){
   
    $scope.fetchNotifications = function(){
        RestService.notifications().then(function(response){
            $scope.notifCallBack = response.data;
        });
    }

    $scope.fetchNotifications();
   
}]);