app.controller("upload-controller",['$scope','RestService',function($scope,RestService){
    $scope.$on('LOAD',function(){$scope.loading=1});
    $scope.$on('UNLOAD',function(){$scope.loading=0});
    $scope.showResponse = 0;

    $scope.upload = function(){
 
        var fd = new FormData();
        var files = document.getElementById('file').files[0];
        fd.append('file',files);
      
        // AJAX request
       $scope.$emit('LOAD');
       RestService.uploadImage(fd).then(function successCallback(response) { 
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
        fd.append('file[]',file);
   });

    }

   

}]);

