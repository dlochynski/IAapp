  var myApp = angular.module('myApp', ['ngRoute']);

  myApp.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        access: {
          restricted: true
        }
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        access: {
          restricted: false
        }
      })
      .when('/logout', {
        controller: 'logoutController',
        access: {
          restricted: true
        }
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerController',
        access: {
          restricted: false
        }
      })
      .when('/users', {
        templateUrl: 'partials/userList.html',
        access: {
          restricted: true
        }
      })
      .when('/clinics', {
        templateUrl: 'partials/clinics.html',
        access: {
          restricted: true
        }
      })
      .when('/doctors', {
        templateUrl: 'partials/doctors.html',
        access: {
          restricted: true
        }
      })
      .when('/duties', {
        templateUrl: 'partials/duty.html',
        access: {
          restricted: true
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (!next.redirectTo && next.access.restricted && AuthService.isLoggedIn() === false) {
        $location.path('/login');
        $route.reload();
      }
    });
  });
