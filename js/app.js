// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'ion-sticky', 'formlyIonic', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

/*   .run(function (, Backand) {

 })
 */
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


  $stateProvider
  // setup an abstract state for the tabs directive
    .state('checkin', {
      url: '/checkin',
      templateUrl: 'templates/checkin.html',
      controller: 'CheckinCtrl'
    })
    .state('tab', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
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
    })
    .state('admin.community', {
      url: '/community',
      views: {
        'tab-community': {
          templateUrl: 'templates/admin/community.html',
          controller: 'AdminCommunityCtrl'
        }
      }
    })
    .state('admin.survey', {
      url: '/survey',
      views: {
        'tab-survey': {
          templateUrl: 'templates/admin/survey.html',
          controller: 'SurveyCtrl'
        }
      }
    })
    .state('tab.dashboard', {
      url: '/dashboard',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/tab-dashboard.html',
          controller: 'DashboardCtrl as vm'
        }
      }
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/tab-login.html',
          controller: 'LoginCtrl as login'
        }
      }
    })
    .state('tab.forms', {
      url: '/forms',
      views: {
        'tab-forms': {
          templateUrl: 'templates/tab-forms.html',
          controller: 'FormCtrl'
        }
      }
    })
    .state('tab.formcreator', {
      url: '/editform?:id',
      views: {
        'tab-formcreator': {
          templateUrl: 'templates/tab-formcreator.html',
          controller: 'FormCreatorCtrl as vm'
        }
      }
    })
    .state('tab.signup', {
      url: '/signup',
      views: {
        'tab-signup': {
          templateUrl: 'templates/tab-signup.html',
          controller: 'SignUpCtrl as vm'
        }
      }
    });

  $urlRouterProvider.otherwise('/tabs/form');
  $httpProvider.interceptors.push('APIInterceptor');
})

.run(function ($ionicPlatform, $rootScope, $state, CheckinService) {

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

})