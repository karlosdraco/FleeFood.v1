app.controller("upload-controller",['$scope','$rootScope','RestService','$route',function($scope,$rootScope,RestService, $route){
    
    $scope.$on('LOAD',function(){$scope.loading=1});
    $scope.$on('UNLOAD',function(){$scope.loading=0});
    $scope.showResponse = 0;
    $scope.showModal = 0;
    $scope.uploadResponse = "";
    $scope.errMsg = "";
    $scope.disablePostButton = false;
    $scope.showPreloader = false;

    $scope.upload = function(){
        
            var fd = new FormData();
            angular.forEach($scope.uploadfiles, function(file){
                fd.append("file", file);
            });
          
            $scope.$emit('LOAD');
            RestService.uploadImage(fd).then(function(response){ 
                // Store response data
                $scope.response = response.data;
                $scope.showResponse = 1;
                $route.reload();
                $scope.$emit('UNLOAD');
            });
    }

    
    $scope.uploadFoodGallery = function(){
        var fd = new FormData();
        
        angular.forEach($scope.uploadfiles,function(file){
            fd.append('file',file);
        });

        RestService.foodImage(fd).then(function(response){
            $scope.uploadResponse = response.data;

            if($scope.uploadResponse.message_code == 1){
                $rootScope.showPost = 0;
                $scope.errMsg = $scope.uploadResponse.message;
            }else if($scope.uploadResponse.message_code == 0){
                $scope.errMsg = $scope.uploadResponse.message;
            }
        });
    }

   

}]);

