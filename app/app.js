var app = angular.module("fleefood_app",['ngRoute']);
 
app.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider){
    $httpProvider.defaults.withCredentials = true;
    
    $routeProvider
    .when("/",{
        templateUrl: 'views/landing-page.html',
        controller: 'landing-page-controller'
      })
      
      .when("/profile",{
        templateUrl: 'views/profile.html',
        controller: 'profile-controller'
      }).otherwise({
        redirectTo: '/'
      });
}]);


