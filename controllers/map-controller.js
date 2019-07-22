app.controller("map-controller", ['$scope', '$rootScope','$window', function($scope, $rootScope, $window){
  $scope.fullOnAddress = "";
  $scope.mapResult;
  $scope.geoResult;
  var location;
  $scope.fullAddress = {
    add1: $rootScope.viewedFood.addressLine1,
    add2: $rootScope.viewedFood.addressLine2
  };
  var fullOnAddress = $scope.fullAddress.add1 + " " + $scope.fullAddress.add2;
  var map;
  var geocoder;
  var pos;

  
 //Initialize map
  function initMap() {
    geocoder = new google.maps.Geocoder();
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    //var latlng = new google.maps.LatLng(14.336760, 120.985915); 
    map = new google.maps.Map(document.getElementById('map'),{
      zoom: 18,
      gestureHandling: 'cooperative'
    });

    directionsDisplay.setMap(map);
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        pos = {
          lat: position.coords.latitude,
          lang: position.coords.longitude
        }
      });
    }else{
      // Browser doesn't support Geolocation
      alert("Browser doesn't support Geolocation");
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //marker.setMap(map);
  }

  var image = {
    url: $rootScope.viewedFood.profile_image,
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0)
  };

  function codeAddess(){
    geocoder.geocode({'address': fullOnAddress}, function(results, status){
      if(status == 'OK'){
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          animation: google.maps.Animation.BOUNCE,
          icon: image,
          title: $rootScope.viewedFood.firstname + " " + $rootScope.viewedFood.lastname
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: "Bacoor Cavite",
      destination: fullOnAddress,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  initMap();
  codeAddess();
}]);