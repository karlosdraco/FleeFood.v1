app.controller('home-controller', ['$scope','$rootScope','$window','$location', function($scope, $rootScope,$window, $location){
    $scope.switchColor = ['#cecece','#ffffff'];
    $scope.switchText = ['#ffffff', 'black'];
    $scope.switch = [];
    $scope.switch[0] = 1;
    $scope.switchCSS = {};

    $scope.switchSelector = function(index){
        for(var i = 0; i < 2; i++){
            $scope.switch[i] = 0;

            if(i == index){
                $scope.switch[i] = 1;
                $scope.switchColor[i] = '#cecece';
                $scope.switchText[i] = '#ffffff';
            }else{
                $scope.switch[i] = 0;
                $scope.switchColor[i] = '#ffffff';
                $scope.switchText[i] = 'black';
            }
        }
    }

    
    

}]);