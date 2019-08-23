app.controller("post-controller",['$scope','$rootScope','RestService',function($scope,$rootScope,RestService){
    $scope.post = {
        foodName: null,
        foodDescription: null,
        foodPrice: null,
        foodQuantity: null,
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
    $scope.disableNextButton = false;
    $scope.disablePostButton = false;
    $scope.showPreloader = false;
    $scope.delete = {}; 
   
    $scope.selectedFilter = '$';
    $scope.filterSearch = {};
    
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

    var resetFile = document.getElementById('file');
    $scope.removeImage = function(image){
        var remove = $scope.stepsModel.indexOf(image);
        $scope.stepsModel.splice(remove, 1);
        resetFile.value = '';
    }

    $scope.PostModal = function(){
        $rootScope.showPost++;
        if($rootScope.showPost > 1){
            $rootScope.showPost = 0;
        }
    }

    $scope.key = ($event) => {
        if($event.keyCode == 27){
            $rootScope.showPost--;
        }
    }


    $scope.postIndex = 0;
    $scope.deleteFood = function(index){
        $scope.postIndex = $rootScope.feed.indexOf(index);
        var removePost = $rootScope.feed[$scope.postIndex];

        $scope.delete = {
            foodId: removePost.id,
            userId: removePost.user_id,
        }
        RestService.deletePost($scope.delete).then(function(response){
             $scope.data = response.data;

             if($scope.data.errorCode == 0){
                 $rootScope.feed.splice(removePost, 1);
             }
        })
    }


    function errorMsgFunc(msg){
        $scope.showErrorMsg = 1;
        $scope.errMsg = msg;
        setInterval(function(){
            $scope.showErrorMsg = 0;
        },3000);
    }


    $scope.foodInput = document.getElementsByClassName("foodInput")[0];
    var postForm = document.getElementById('postForm');

    $scope.formReset = function(){
        postForm.reset();
    }
    
    $scope.buttonText = "Post";
    $scope.foodPost = function(){
        
        $scope.buttonText = '';
        $scope.disablePostButton = true;
        $scope.showPreloader = true;
       
        RestService.foodPost($scope.post).then(function(response){
            $scope.data = response.data;
            
            if($scope.data.error == false){
                $scope.showPreloader = false;
                //$scope.postCardSelector(0);
                //$scope.postCardSelector(1);
                errorMsgFunc($scope.data.message);
                $rootScope.uploadFoodGallery();
                postForm.reset();
                resetFile.value = '';
                
            }else if($scope.data.error == true){
                $scope.disablePostButton = false;
                $scope.showPreloader = false;
                $scope.buttonText = "Post";
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

