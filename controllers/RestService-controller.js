app.factory("RestService", ['$http','$routeParams',function($http, $routeParams){
     
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
            method: 'DELETE',
            url: 'http://127.0.0.1/fleefood_API/logout',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json',
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

    service.isloggedIn = function(){
        return $http({
            method: 'GET',
            url: 'http://127.0.0.1/fleefood_API/loggedIn',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.getUserName = function(){
        return $http({
            method: 'GET',
            url: 'http://127.0.0.1/fleefood_API/profile',
            params:{name: $routeParams.name},
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.updateUser = function(user){
        return $http({
            method: 'PUT',
            url: 'http://127.0.0.1/fleefood_API/profile',
            data: user,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.uploadImage = function(fd){
        return $http({
            method: 'PUT',
            url: 'http://127.0.0.1/fleefood_API/upload',
            data: fd,
            withCredentials: true,
            headers: {
                'Content-Type': undefined
            }
        })
    }

    return service;
}]);