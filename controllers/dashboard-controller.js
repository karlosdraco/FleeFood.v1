app.controller("dashboard-controller", ['$scope','$rootScope','RestService','$cookies', '$route', '$routeParams', function($scope, $rootScope,RestService, $cookies, $route, $routeParams){
    $scope.showModal = 0;
    $scope.showUpdate = 1;
    $scope.showFollow = 0;
    $scope.showEditBtn = 0;
    $scope.followbtn = "Follow";
    $scope.showUpdateProfileImageBtn = 0;
    $scope.showProfileImageModal = 0;
    $scope.user = {};
    $scope.autofill = {};
    $scope.stepsModel = [];
    $scope.count = 0;
    $rootScope.profileCard = {};
    $scope.showEditModal = 0;
    $scope.showErrorLabel = 1;
    $scope.showCart = 1;
   
    //CHECKING IF THERE'S A COOKIE
    if($cookies.get('auth_token')){

        RestService.isloggedIn().then(function(response){
            $scope.loggedUser = response.data;

        });

        RestService.getUserName().then(function(response){
            $scope.profile = response.data;
            $scope.followers = $scope.profile.profile_data.followers;
            $scope.following = $scope.profile.profile_data.following;

            $scope.user = {
                bio: $scope.profile.profile_data.bio,
                birthdate: $scope.profile.profile_data.birthdate,
                age: parseInt($scope.profile.profile_data.age),
                addressLine1: $scope.profile.profile_data.addressLine1,
                addressLine2: $scope.profile.profile_data.addressLine2,
                occupation: $scope.profile.profile_data.occupation,
                country: $scope.profile.profile_data.country,
                zipCode: parseInt($scope.profile.profile_data.zipCode)
            };

           $rootScope.profileCard = {
               following: $scope.profile.profile_data.followingCount,
               follower: $scope.profile.profile_data.followerCount,
           }
        },function error(response){
            $error = response.data;
        });

        RestService.followStatus().then(function(response){
            $scope.followStatus = response.data;
        });
    }

    //FOLLOW USER
    $scope.followUser = function(){
        
        if($scope.followStatus.following == true){
            RestService.follow().then(function(response){
                $scope.follow = response.data;
            })
        }else if($scope.followStatus.following == false){
            RestService.follow().then(function(response){
                $scope.follow = response.data;
            })
        }
        
        RestService.followStatus().then(function(response){
            $scope.followStatus = response.data;
        });
        $route.reload();
    }
   
    //MODAL FUNCTIONALITY
    $scope.modal = function(){
        $scope.showModal++;
        if($scope.showModal > 1){
            $scope.showModal = 0;
        }
    }

    //PROFILE IMAGE MODAL FUNCTIONALITY      
    $scope.profileImageModal = function(){
        $scope.showProfileImageModal++;
        if($scope.showProfileImageModal > 1){
            $scope.showProfileImageModal = 0;
        }
    }

    //FETCHING PROFILE DATA
    $scope.show_profile_update = function(){
        if($scope.loggedUser.firstname != $routeParams.name || $scope.loggedUser.id != $routeParams.id){
            $scope.showFollow = 1;
            $scope.showUpdateProfileImageBtn = 0;
            $scope.showEditBtn = 0;
            return $scope.showUpdate = 0;
        }else{
          
            $scope.showFollow = 0;
            $scope.showUpdateProfileImageBtn = 1;
            $scope.showEditBtn = 1;
            return $scope.showUpdate = 1;
        }
    }

     //UPDATE PROFILE IMAGE
    $scope.imageUpload = function(event){
        var files = event.target.files;

        var file = files[0];
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function(){
            $scope.stepsModel.push(e.target.result);
        });
    }

     //UPDATE PROFILE DATA
    $scope.updateProfile = function(){
        //console.log($scope.user);
        RestService.updateUser($scope.user).then(function(response){
            $scope.error = response.data;
            $route.reload();
            if($scope.error.error == false){
                alert($scope.error.message);
            }else{
                alert("There's an error updating your account");
            }
        });
    }

    $scope.editModalOn = function(){
        $scope.showEditModal++;
        if($scope.showEditModal > 1){
            $scope.showEditModal = 0;
            $scope.showErrorLabel = 0;
        }
    }


    $scope.editPost = function(index){
        $scope.editIndex = $rootScope.feed.indexOf(index);
        $scope.toUpdate = $rootScope.feed[$scope.editIndex];
        $scope.editModalOn();
        
        $scope.update = {
            userId: $rootScope.data.id,
            foodId: $scope.toUpdate.id,
            foodName:  $scope.toUpdate.food_name,
            foodDesc:  $scope.toUpdate.food_description,
            foodPrice:  parseFloat($scope.toUpdate.food_price),
            foodCurrency: $scope.toUpdate.currency,
            foodAvailability: $scope.toUpdate.food_availability,
            foodDelivery: parseFloat($scope.toUpdate.delivery_type),
            foodAdd1: $scope.toUpdate.addressLine1,
            foodAdd2: $scope.toUpdate.addressLine2
        }
    }

    $scope.saveUpdate = function(){
        RestService.updatePost($scope.update).then(function(response){
            $scope.editCallBack = response.data;
            $scope.showErrorLabel = 1;
        });
    }

    $scope.viewMyOrder = function(){
        RestService.myOrder().then(function(response){
            $scope.cart = response.data;
            if($scope.cart.count == 0){
                $scope.showCart = 0;
            }
        })
    }

    //PROFILE FEED SELECTOR
    $scope.tab = [];
    $scope.tab[0] = 1;
    
    $scope.dashboardSelector = function(index){
        for(var i = 0; i < 6; i++){
            $scope.tab[i] = 0;
            if(i == index){
                $scope.tab[i] = 1;
            }else{
                $scope.tab[i] = 0;
            }
        }
    }

    
  
    
}]);