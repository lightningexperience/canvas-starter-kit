(function() {
  'use strict';

  angular
  .module('app')
  .directive('initialize', ['$window', '$rootScope', '$timeout','canvas', initialize])
  .directive('sizeContent', ['$window', '$rootScope', '$timeout','canvas', sizeContent]);

  function initialize($window, $rootScope, $timeout, canvas) {
    return function(scope, element, attributes) {
      var resize;

      //initialize our canvas library, this will resize the canvas app and force a resize
      canvas.initialize(confirmInitialization);

      function confirmInitialization(result) {
        scope.$evalAsync(function(){
          scope.firstName = result.context.user.firstName;
          scope.context = JSON.stringify(result.context, null, 2);
        });
      }

      //On window resize => resize the app
      angular.element($window).on('resize', windowResize);

      function windowResize(e) {
        //Compare this to event target to make sure this isn't an event that has bubbled up
        if (this == e.target) {
          $rootScope.$broadcast('resize');
          $timeout.cancel(resize);
          resize = $timeout(function() {
              resizeBody($window);
          }, 200);
        }
      }
    };
  }

  function sizeContent($window, $rootScope, $timeout) {
    return function(scope, element, attributes){
      var resize = $timeout(function() {
          resizeBody($window);
      }, 200);
    };
  }

  function resizeBody(window) {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var sideBarWidth = document.getElementById('sidebar').offsetWidth;
    document.body.style.height = height + "px";
    document.getElementById('content').style.width = width - sideBarWidth + "px";
  }

}());
