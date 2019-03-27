app.controller("upload-controller",['$scope','$http', 'RestService',function($scope, $http, RestService){
    
    $scope.upload = function(){
 
        var fd = new FormData();
        var files = document.getElementById('file').files[0];
        fd.append('file',files);
      
        // AJAX request
       RestService.uploadImage(fd).then(function successCallback(response) { 
          // Store response data
          $scope.response = response.data;
       });
    }



}]);