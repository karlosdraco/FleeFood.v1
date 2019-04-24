app.controller("profile-controller", ['$scope', 'RestService','$cookies', '$route', '$routeParams', function($scope, RestService, $cookies, $route, $routeParams){
    $scope.showModal = 0;
    $scope.showUpdate = 1;
    $scope.showFollow = 0;
    $scope.followbtn = "Follow";
    $scope.showUpdateProfileImageBtn = 0;
    $scope.showProfileImageModal = 0;
    $scope.user = {};
    $scope.autofill = {};
    $scope.stepsModel = [];
    $scope.count = 0;
    
    //CHECKING IF THERE'S A COOKIE
    if($cookies.get('auth_token')){

        RestService.isloggedIn().then(function(response){
            $scope.loggedUser = response.data;
        });

        RestService.getUserName().then(function(response){
            $scope.profile = response.data;
            
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

        }, function error(response){
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
        }else{
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
        if($scope.loggedUser.firstname != $routeParams.name){

            $scope.showFollow = 1;
            $scope.showUpdateProfileImageBtn = 0;
            return $scope.showUpdate = 0;
        }else{
          
            $scope.showFollow = 0;
            $scope.showUpdateProfileImageBtn = 1;
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

  
}]);