app.controller("responsive-controller", ['$scope','$rootScope','$window',function($scope,$rootScope, $window){
    $rootScope.hide_element = 1;
    $scope.screen = {};
    $scope.width = $window.innerWidth;
    $scope.height = $window.innerHeight;
    
    angular.element($window).bind('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
            $scope.height = $window.innerHeight;

            if($scope.width <= 610 || $scope.width <= 300){
                $rootScope.hide_element = 0;
            }else{
                $rootScope.hide_element = 1;
            }
        });
    });

   /*angular.element(function(){
    $scope.$apply(function () {
        $scope.width = $window.innerWidth;
        $scope.height = $window.innerHeight;

            if($scope.width == 500){
                $rootScope.hide_element = 0;
            }else{
                $rootScope.hide_element = 1;
            }
        });
   })*/

}]);