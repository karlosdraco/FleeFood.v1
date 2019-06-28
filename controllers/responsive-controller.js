app.controller("responsive-controller", ['$scope','$rootScope','$window',function($scope,$rootScope, $window){
    $rootScope.hide_element = 1;
    $scope.hideUserGlobal = 1;
    $scope.screen = {};
    $scope.width = $window.innerWidth;
    $scope.height = $window.innerHeight;
    
    angular.element($window).bind('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
            $scope.height = $window.innerHeight;
            $scope.headerUI();
        });
    });

    $scope.headerUI = function(){

        if($scope.width <= 610 || $scope.width <= 300){
            $rootScope.hide_element = 0;
        }
        
        if($scope.width <= 400){
            $rootScope.hide_element = 0;
        }else{
            $rootScope.hide_element = 1;
           
        }
    }

}]);