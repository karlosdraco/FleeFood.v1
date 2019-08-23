var app = angular.module("fleefood_app",['ngRoute','ngCookies','ngAnimate']);

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
        controller: 'landing-page-controller'
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
      
      .when("/notifications",{
        templateUrl: 'views/notifications.html',
        controller: 'notifications-controller', 
        resolve: resolver(true)
      })

      .when("/post",{
        templateUrl: 'views/post.html',
        controller: 'post-controller',
        resolve: resolver(true)
      })

      .when("/stalls",{
        templateUrl: 'views/stalls.html',
        controller: 'stall-controller',
        resolve: resolver(true)
      })

      .when("/account_settings",{
        templateUrl: 'views/account-settings.html',
        controller: 'accountSet-controller',
        resolve: resolver(true)
      })

      .when("/about",{
        templateUrl: 'views/about.html',
        resolve: resolver(true)
      })
      
      .when("/page",{
        templateUrl: 'views/page.html',
        resolve: resolver(true)
      }).otherwise({
        redirectTo: '/page',
        resolve: resolver(false)
        
      });
}]).run(function($rootScope, $location, $cookies, $http){
  
  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if(next.access) {
      event.preventDefault();
      $rootScope.$evalAsync(function() {
        $location.path('/');
      });
    }
    
    var restrictedPage = $.inArray($location.path(), ['/']) === -1;
    var loggedIn = $cookies.get('auth_token');
    if(restrictedPage && !loggedIn){
      $location.path('/');
    }

    /*var restrictLandingPage = $.inArray($location.path(), ['/home', '/post', '/dashboard/', '/notifications', '/about', '/page', '/account_settings', '/stalls']) === -1;
     if(restrictLandingPage && loggedIn){
       $location.path('/home');
     }*/

  });
})
