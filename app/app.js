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
      })

      .when("/home",{
        templateUrl: 'views/home.html',
        controller: 'home-controller',
        resolve: resolver(true)
      })
      
      .when("/dashboard/:name/:id",{
        templateUrl: 'views/dashboard.html',
        controller: 'dashboard-controller',
        resolve: resolver(true)
      })
      
      .when("/notification",{
        templateUrl: 'views/notifications.html',
        controller: 'notification-controller',
        resolve: resolver(true)
      })
      
      .when("/page",{
        templateUrl: 'views/page.html',
        resolve: resolver(true)
      }).otherwise({
        redirectTo: '/page',
        resolve: resolver(false)
      });
}]);