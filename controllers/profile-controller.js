app.controller("profile-controller", ['$scope', 'RestService','$cookies', '$route', '$routeParams', function($scope, RestService, $cookies, $route, $routeParams){
    $scope.showModal = 0;
    $scope.showUpdate = 1;
    $scope.showFollow = 0;
    $scope.followbtn = "Follow";
    $scope.showUpdateProfileImageBtn = 0;
    $scope.showProfileImageModal = 0;
    $scope.user = {};
    $scope.autofill = {};
    var count = 0;

    //CHECKING IF THERE'S A COOKIE
    if($cookies.get('auth_token')){

        RestService.isloggedIn().then(function(response){
            $scope.loggedUser = response.data;
        });

        RestService.getUserName().then(function(response){
            $scope.profile = response.data;

            $scope.user = {
                bio: $scope.profile[0].bio,
                birthdate: $scope.profile[0].birthdate,
                age: parseInt($scope.profile[0].age),
                addressLine1: $scope.profile[0].addressLine1,
                addressLine2: $scope.profile[0].addressLine2,
                occupation: $scope.profile[0].occupation,
                country: $scope.profile[0].country,
                zipCode: parseInt($scope.profile[0].zipCode)
            };
            
        }, function error(response){
            if(response.status == 404){
                $scope.tmpImg = './contents/assets/Resource/images/icons/profile_image.jpg';
            }
        });
    }
   
   
    $scope.follow = function(){
        count++;
        if(count > 0){
            $scope.followbtn = "Unfollow";
        }if(count > 1){
            count = 0;
        }else{
            $scope.followbtn = "Follow";
        }
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