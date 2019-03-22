var app = angular.module("fleefood_app",['ngRoute','ngCookies']);

app.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider){
    $httpProvider.defaults.withCredentials = true;
    
    $routeProvider
      .when("/",{
        templateUrl: 'views/landing-page.html',
        controller: 'landing-page-controller'
      })

      .when("/home",{
        templateUrl: 'views/home.html',
        controller: 'home-controller'
      })
      
      .when("/profile/:name",{
        templateUrl: 'views/profile.html',
        controller: 'profile-controller'
      }).otherwise({
        redirectTo: '/'
      });
}]);


