app.controller("map-controller", ['$scope', '$rootScope','MapService','$window', function($scope, $rootScope,MapService, $window){
  $scope.fullOnAddress = "";
  $scope.mapResult;
  $scope.geoResult;
  $scope.location;


    $scope.fullAddress = {
        add1: $rootScope.viewedFood.addressLine1,
        add2: $rootScope.viewedFood.addressLine2
    };
    
    $scope.fullOnAddress = $scope.fullAddress.add1 + " " + $scope.fullAddress.add2;
    
    MapService.geoCode($scope.fullOnAddress).then(function(result, status){
        if(status == google.maps.GeocoderStatus.OK && result.length > 0){
            $rootScope.mapResult = result.data;
            $scope.geoResult = result.data.results;
            $scope.location = $scope.geoResult[0].geometry.location;
            console.log("lat: " + $scope.location.lat);
        }
    }).then(function(error){
        $scope.mapError = error.data;
    })

var geocoder;
  var map;
  function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(14.336760, 120.985915);
    
    var mapOptions = {
      zoom: 12,
      center: latlng
    }

    var image = {
      url: $rootScope.viewedFood.profile_image,
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0)
    };

    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      animation: google.maps.Animation.BOUNCE,
      icon: image,
      title: $rootScope.viewedFood.firstname + " " + $rootScope.viewedFood.lastname
    });

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    marker.setMap(map);
  }

  initMap();
}]);