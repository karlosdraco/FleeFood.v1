app.controller("post-controller",['$scope','$rootScope','RestService',function($scope,$rootScope,RestService){
    $scope.post = {
        foodName: null,
        foodDescription: null,
        foodPrice: null,
        currency: null,
        foodAvailability: null,
        deliveryFee: null,
        addressLine1: null,
        addressLine2: null
    }
    $scope.stepsModel = [];
    $rootScope.showPost = 0;
    $scope.showCardPost = 0;
    $scope.showErrorMsg = 0;
    $scope.errMsg = "";
    $scope.disable = true;

    $scope.imageUpload = function(event){
        
        var files = event.target.files;

        for(var i = 0; i < files.length; i++){
            var file = files[i];
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(file);
            //console.log(file);
        }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function(){
            $scope.stepsModel.push(e.target.result);
        });
    }

    $scope.removeImage = function(image){
        var remove = $scope.stepsModel.indexOf(image);
        $scope.stepsModel.splice(remove, 1);
    }

    $scope.PostModal = function(){
        $rootScope.showPost++;
        if($rootScope.showPost > 1){
            $rootScope.showPost = 0;
        }
    }

    /*function isEmpty(obj){
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }*/

    function errorMsgFunc(msg){
            $scope.showErrorMsg = 1;
            $scope.errMsg = msg;
            setInterval(function(){
                $scope.showErrorMsg = 0;
            },3000);
    }

    $scope.foodInput = document.getElementsByClassName("foodInput")[0];
    
    $scope.foodPost = function(){

            RestService.foodPost($scope.post).then(function(response){
                $scope.data = response.data;
                
                if($scope.data.error == false){
                    $scope.postCardSelector(0);
                    $scope.postCardSelector(1);
                    errorMsgFunc($scope.data.message);
                
                }else if($scope.data.error == true){
                    errorMsgFunc($scope.data.message);
                    
                }
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

