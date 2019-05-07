app.controller("post-controller",['$scope','RestService',function($scope,RestService){
    $scope.post = {};
    $scope.stepsModel = [];
    $scope.showPost = 0;
    
    $scope.imageUpload = function(event){
        
        var files = event.target.files;

        for(var i = 0; i < files.length; i++){

            if(files.length > 5){
                alert("Maximum photo 5");
            }else{
                var file = files[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file);
                console.log(file);
            }
        }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function(){
            $scope.stepsModel.push(e.target.result);
        });
    }

    $scope.PostModal = function(){
        $scope.showPost++;
        if($scope.showPost > 1){
            $scope.showPost = 0;
        }
    }

    $scope.foodPost = function(){

        //var form = document.getElementById('foodForm');
        RestService.foodPost($scope.post).then(function(response){
            $scope.data = response.data;
        })
        //form.reset();
    }

}]);

