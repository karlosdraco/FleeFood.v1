app.controller('header-controller', ['$scope','$document', function($scope, $document){
    $scope.showButton = false;
    
    var searchBar = document.getElementById("search-bar");

    $scope.searchTransitions = function(){
        $scope.showButton = !($scope.showButton);
        event.stopPropagation();
    };

    window.onclick = function(event){
        if($scope.showButton){
            $scope.showButton = false;
            $scope.$apply();
        }
    };


}]);