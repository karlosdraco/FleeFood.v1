app.controller('header-controller', ['$scope','$rootScope','RestService','$cookies','$location','$timeout',function($scope,$rootScope,RestService, $cookies,$location, $timeout){
  
  var loadTime = 5000, //Load the data every second
  errorCount = 0, //Counter for the server errors
  loadPromise; //Pointer to the promise created by the Angular $timout service
  $scope.showDropdown = 0;
  $scope.showNavBar = 0;
  $scope.showUserHeaderIcon = 0;
  $scope.showHeaderNav = 0;
  $scope.showCountIcon = 1;
  $scope.incrementTrigger = 0;
  $scope.isFetched = 0;
  $scope.notifCount = 0;
  $rootScope.showLandingPage = 1;
  $rootScope.userloggedIn = false;
  
  
$scope.key = ($event) => {
    $scope.showDropdown--;
    //console.log('got key ' + $event.code);
}
  ///////////////////////////////ASYNC DATA///////////////////////////////////////
var getData = function(){ 
    
    RestService.asyncData().then(function(response){
        $scope.dataFeed = response.data;

        if($scope.dataFeed.fetched == 0){
            $scope.showCountIcon = 1;
            $scope.isFetched = $scope.dataFeed.fetched;
            $scope.notifCount = $scope.dataFeed.notificationCount - 1

            if($scope.dataFeed.notificationCount > $scope.notifCount){
                
                if($scope.notifCount > 0){
                    $scope.notifCount + 1;
                }
                let audio = new Audio('contents/assets/resource/audio/notification_sound.mp3');
                audio.play();
            }
           
        }else if($scope.dataFeed.fetched == 1){
            $scope.showCountIcon = 0;
        }
        
        errorCount = 0;
        nextLoad();
    }).catch(function() {
        $scope.feed = 'Server error';
        nextLoad(++errorCount * 2 * loadTime);
    });
}

var cancelNextLoad = function(){
    $timeout.cancel(loadPromise);
}

var nextLoad = function(mill){
    mill = mill || loadTime;

    //Always make sure the last timeout is cleared before starting a new one
    cancelNextLoad();
    loadPromise = $timeout(getData, mill);
}

//Start polling the data from the server
getData();

//Always clear the timeout when the view is destroyed, otherwise it will keep polling and leak memory
 $scope.$on('$destroy', function() {
    cancelNextLoad();
 });

 //$scope.data = 'Loading...';

    ///////////////////////////////ASYNC DATA END///////////////////////////////////////

    $scope.dropToggle = function(){
        $scope.showDropdown++;

        if($scope.showDropdown > 1){
            $scope.showDropdown = 0;
        }
    }
   
    $scope.navBarSlider = function(){
        $scope.showNavBar++;

        if($scope.showNavBar > 1){
            $scope.showNavBar = 0;
        }
    }

    $scope.logout = function(){
        RestService.logOut().then(function(response){
            $scope.error = response.data;
           
            if(!$scope.error.error){
                //$window.location.href = '#!/home';
                location.href = "/fleefood.v1";
                $rootScope.userloggedIn = false;
            }else{
                $scope.showError = true;
            }
        });
    }

    $scope.viewNotification = function(){
        RestService.fetchView().then(function(response){
            $scope.fetch = response.data;
        });
    }

    //if($cookies.get('auth_token')){
        RestService.isloggedIn().then(function(response){
            $rootScope.data = response.data;

            if($rootScope.data.loggedIn){
                $rootScope.userloggedIn = true;
                $rootScope.loggedUser = 1;
                $scope.showUserHeaderIcon = 1;
                $scope.showHeaderNav = 1;
                //$window.location.href="/fleefood.v1/#!/home";
            
                $rootScope.showLandingPage = 0;
            }else{
                $scope.showUserHeaderIcon = 0;
            }

            /*if($rootScope.userloggedIn || $location.path('#/!')){
                $location.path('home');
            }*/
        });

       
    //}else{
        //$scope.showUserHeaderIcon = 0;
       
        //$window.location.href="/fleefood.v1/#!/";
   // }
   

}]);