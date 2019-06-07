var app = angular.module("fleefood_app",['ngRoute','ngCookies']);

app.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider){
  $httpProvider.defaults.withCredentials = true;

  var resolver = function(access) {
    return {
      load: function($q) {
        if (access) { // fire $routeChangeSuccess
          var deferred = $q.defer();
          deferred.resolve();
          return deferred.promise;
        } else { // fire $routeChangeError
          return $q.reject("/");
        }
      }
    }
  }

    $routeProvider
      .when("/",{
        templateUrl: 'views/landing-page.html',
        controller: 'landing-page-controller',
        resolve: resolver(false)
      })

      .when("/home",{
        templateUrl: 'views/home.html',
        controller: 'home-controller',
        resolve: resolver(true)
      })
      
      .when("/dashboard/:name/:id",{
        templateUrl: 'views/dashboard.html',
        controller: 'profile-controller',
        resolve: resolver(true)
      }).otherwise({
        redirectTo: '/'
      });
}]);


