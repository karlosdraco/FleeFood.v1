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
  }

  /*function codeAddress() {
    var address1 = document.getElementById('addressLine1').value;
    var address2 = document.getElementById('addressLine2').value;
    var fullOnAddress = address1 + " " + address2;
    

    geocoder.geocode( { 'address': fullOnAddress}, function(results, status) {
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
  }*/

 

  