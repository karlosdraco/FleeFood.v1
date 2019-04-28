app.factory("RestService", ['$http','$routeParams',function($http, $routeParams){
     
    var service = {};
    var url = 'http://127.0.0.1/fleefood_API/';
    
    service.loginUser = function(user){
        return $http({
            method: 'POST',
            url: url + 'login',
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
            url: url + 'logout',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json',
            } 
        })
    }

    service.signupUser = function(user){
        return $http({
            method: 'POST',
            url: url + 'signup',
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
            url: url + 'loggedIn',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.getUserName = function(){
        return $http({
            method: 'GET',
            url: url + 'profile',
            params:{name: $routeParams.name},
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.getFeed = function(){
        return $http({
            method: 'GET',
            url: url + 'feed',
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.userPost = function(){
        return $http({
            method: 'GET',
            url: url + 'post',
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
            url: url + 'profile',
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
            url: url + 'upload?image=profile',
            data: fd,
            withCredentials: true,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: []
        })
    }

    service.foodPost = function(post){
        return $http({
            method: 'POST',
            url: url + 'post',
            data: post,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.foodImage = function(fd){
        return $http({
            method: 'POST',
            url: url + 'upload?image=food',
            data: fd,
            withCredentials: true,
            headers : { 
                'Content-Type': undefined
            } 
        })
    }

    service.followStatus = function(){
        return $http({
            method: 'GET',
            url: url + 'follow',
            params:{name: $routeParams.name},
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.follow = function(){
        return $http({
            method: 'POST',
            url: url + 'follow',
            params:{name: $routeParams.name},
            withCredentials: true,
            headers : { 
                'Content-Type': undefined
            } 
        })
    }

    return service;
}]);