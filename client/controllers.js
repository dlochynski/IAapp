angular.module('myApp').controller('loginController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.login = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function() {
          console.log(AuthService.getUserRole)
          if (AuthService.getUserRole() === 'Admin') {
            $location.path('/admin');
          } else {
            $location.path('/');
          }
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

  }
]);

angular.module('myApp').controller('logoutController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.logout = function() {

      // call logout from service
      AuthService.logout()
        .then(function() {
          $location.path('/login');
        });

    };

  }
]);
angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.register = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function() {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

  }
]);

angular.module('myApp').controller('adminRouteController', ['$scope', 'AuthService', '$location',
  function($scope, AuthService, $location) {
    $scope.admin = AuthService.getUserRole() === 'Admin' ? true : false;

    $scope.showUserList = function() {
      $location.path('/users');
    };
    $scope.showClinics = function() {
      $location.path('/clinics')
    };

  }
]);

angular.module('myApp').controller('adminController', ['$scope', 'AuthService', 'AdminService', '$location',
  function($scope, AuthService, AdminService, $location) {
    console.log(AuthService);
    $scope.admin = AuthService.getUserRole() === 'Admin' ? true : false;
    AdminService.getUserList().then(function(data) {
      $scope.userList = data;
    });
    $scope.activateUser = function(obj) {
      obj.active = true;
      AdminService.activateUser(obj.username);
    };


  }
]);

angular.module('myApp').controller('clinicController', ['$scope', 'AuthService', 'ClinicService', '$location',
  function($scope, AuthService, ClinicService, $location) {
    console.log(AuthService);
    $scope.admin = AuthService.getUserRole() === 'Admin' ? true : false;
    ClinicService.getAll().then(function(data) {
      $scope.clinics = data;
    });
    $scope.create = function(name) {
      ClinicService.create(name).then(function() {
        $scope.clinics.push({name: name})
      });
    };


  }
]);
