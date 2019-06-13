app.factory("MapService", ['$http','$routeParams',function($http, $routeParams){
     
    var service = {};
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?';
    
   
    service.geoCode = function(geoAdd){
        return $http({
            method: 'GET',
            url: url + geoAdd,
            withCredentials: true,
            params: {address: geoAdd, key: "AIzaSyCWyUH8TiF0xRY9jWGbwjwu6m3xq8_8EnM"},
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    return service;
}]);