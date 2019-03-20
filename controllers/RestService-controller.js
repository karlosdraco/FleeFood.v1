app.factory("RestService", ['$http',function($http){
     
    var service = {};
    
    service.loginUser = function(user){
        return $http({
            method: 'POST',
            url: 'http://127.0.0.1/fleefood_API/login',
            data: user,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.logOut = function(){
        return $http({
            method: 'POST',
            url: 'http://127.0.0.1/fleefood_API/logout',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.signupUser = function(user){
        return $http({
            method: 'POST',
            url: 'http://127.0.0.1/fleefood_API/signup',
            data: user,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.getUser = function(){
        return $http({
            method: 'GET',
            url: 'http://127.0.0.1/fleefood_API/profile',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    return service;
}]);