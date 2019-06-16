app.factory("RestService", ['$http','$routeParams',function($http, $routeParams){
     
    var service = {};
    //var url = 'http://127.0.0.1/fleefood_API/';
    //var url = 'https://c76c87f8.ngrok.io/fleefood_API/';
    var url = 'https://aufero.serveo.net/fleefood_API/';
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
            params:{name: $routeParams.name, id: $routeParams.id},
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
            params:{name: $routeParams.name, id: $routeParams.id},
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
            method: 'POST',
            url: url + 'upload',
            data: fd,
            withCredentials: true,
            headers: {
                'Content-Type': undefined
            }
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
            url: url + 'food',
            data: fd,
            withCredentials: true,
            headers : { 
                'Content-Type': undefined
            } 
        })
    }

    service.updatePost = function(fd){
        return $http({
            method: 'PUT',
            url: url + 'post',
            data: fd,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.deletePost = function(fd){
        return $http({
            method: 'DELETE',
            url: url + 'post',
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

    service.orderRequest = function(order){
        return $http({
            method: 'POST',
            url: url + 'order',
            data: order,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.viewOrders = function(){
        return $http({
            method: 'GET',
            url: url + 'orders',
            params: {name: $routeParams.name, id: $routeParams.id},
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    service.requestStatus = function(food){
        return $http({
            method: 'PUT',
            url: url + 'orders',
            data: food,
            withCredentials: true,
            headers : { 
                'Content-Type': 'application/json'
            } 
        })
    }

    return service;
}]);