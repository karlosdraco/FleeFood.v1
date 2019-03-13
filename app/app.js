var app = angular.module("fleefood_app",['ngRoute']);
 
app.config(['$routeProvider',function($routeProvider){
    
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


