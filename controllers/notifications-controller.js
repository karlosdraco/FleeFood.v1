app.controller("notifications-controller", ['$scope', '$rootScope','RestService','$routeParams',function($scope, $rootScope,RestService, $routeParams){
   $scope.verbStatus;
   $scope.verbStatusIcon = " ";
   $scope.verbStatusColor;
   $scope.markedStatus;

    $scope.fetchNotification = function(){
        RestService.notifications().then(function(response){
            $scope.notifCallBack = response.data;
        });
    }
       
   
       
        
    var notifIndex = 0;
    $scope.notifIcon = function(verbIndex){
        notifIndex = $scope.notifCallBack.indexOf(verbIndex);
        var verbIcon = $scope.notifCallBack[notifIndex].verb;

        if(verbIcon == 'ordered'){
            $scope.verbStatusIcon = 'contents/assets/resource/images/icons/ordered.png';
            $scope.verbStatusColor = '#ffe228';
            return true;
        }

        if(verbIcon == 'accepted'){
            $scope.verbStatusIcon = 'contents/assets/resource/images/icons/accepted.png';
            $scope.verbStatusColor = '#44cf62';
            return true;
        }

        if(verbIcon == 'declined'){
            $scope.verbStatusIcon = 'contents/assets/resource/images/icons/declined.png';
            $scope.verbStatusColor = ' #e72636';
            return true;
        }

        if(verbIcon == 'claimed'){
            $scope.verbStatusIcon = 'contents/assets/resource/images/icons/claimed.png';
            $scope.verbStatusColor = ' #ffe228';
            $scope.markedStatus = "marked as";
            return true;
        }

        if(verbIcon == 'cancelled'){
            $scope.verbStatusIcon = 'contents/assets/resource/images/icons/cancelled.png';
            $scope.verbStatusColor = ' #e72636';
            return true;
        }
        
    }

    $scope.fetchNotification();
}]);