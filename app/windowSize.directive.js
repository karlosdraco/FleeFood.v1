'use strict';

/*app.directive('windowSize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
        return {
            'h': w.height(),
            'w': w.width()
        };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;
      scope.style = function () {
          return {
              'height': (newValue.h - 100) + 'px',
              'width': (newValue.w - 100) + 'px'
          };
      };
    }, true);

    w.bind('resize', function () {
        scope.$apply();
    });
  }
})*/

app.directive('resize', function ($window) {
     return function (scope) {
        scope.width = $window.innerWidth;
        scope.height = $window.innerHeight;
        angular.element($window).bind('resize', function () {
            scope.$apply(function () {
                scope.width = $window.innerWidth;
                scope.height = $window.innerHeight;
            });
        });
    };
});