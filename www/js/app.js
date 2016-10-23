// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // Login
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

    // Admin
      .state('admin', {
        url: '/admin',
        abstract: true,
        templateUrl: 'templates/admin/tabs.html'
      })

      .state('admin.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/admin/dash.html',
            controller: 'AdminDashCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  })

  .run(function ($ionicPlatform, $rootScope, $state) {

    $ionicPlatform.ready(function () {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }


      var isMobile = !(ionic.Platform.platforms[0] == "browser");
    });

    function unauthorized() {
      console.log("user is unauthorized, sending to login");
      $state.go('tab.login');
    }

    function signout() {
      LoginService.signout();
    }

    $rootScope.$on('unauthorized', function () {
      unauthorized();
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      if (toState.name == 'tab.login') {
        signout();
      }
      // else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
      //     unauthorized();
      // }
    });

  });
