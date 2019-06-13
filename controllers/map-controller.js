app.controller("map-controller", ['$scope', '$rootScope','MapService','$window', function($scope, $rootScope,MapService, $window){
  $scope.fullOnAddress = "";

    $scope.fullAddress = {
        add1: $rootScope.viewedFood.addressLine1,
        add2: $rootScope.viewedFood.addressLine2
    };
    
    $scope.fullOnAddress = $scope.fullAddress.add1 + " " + $scope.fullAddress.add2;
    MapService.geoCode($scope.fullOnAddress).then(function(response){
        $rootScope.map = response.data;
    })

var geocoder;
  var map;
  function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    geocoder.geocode( { 'address': $scope.fullOnAddress}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  initMap();
}]);