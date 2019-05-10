app.controller("post-controller",['$scope','RestService',function($scope,RestService){
    $scope.post = {};
    $scope.stepsModel = [];
    $scope.showPost = 0;
    $scope.showCardPost = 0;
    
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
        RestService.foodPost($scope.post).then(function(response){
            $scope.postCardSelector(0);
            $scope.postCardSelector(1); 
            $scope.data = response.data;
        })
    }

    $scope.card = [];
    $scope.card[0] = 1;
    
    $scope.postCardSelector = function(index){
        for(var i = 0; i < 2; i++){
            $scope.card[i] = 0;
            if(i == index){
                $scope.card[i] = 1;
            }else{
                $scope.card[i] = 0;
            }
        }
    }

}]);

