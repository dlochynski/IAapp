angular.module('myApp').controller('loginController', ['$scope', '$location', '$rootScope', 'AuthService',
  function($scope, $location, $rootScope, AuthService) {

    $scope.login = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function() {
          // console.log(AuthService.getUserRole)
          $rootScope.user = AuthService.getUser();
          console.log($rootScope.user);
          $location.path('/');
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

angular.module('myApp').controller('adminRouteController', ['$rootScope','$scope', 'AuthService', '$location',
  function($rootScope,$scope, AuthService, $location) {
    $scope.showUserList = function() {
      $location.path('/users');
    };
    $scope.showClinics = function() {
      $location.path('/clinics')
    };
    $scope.showDoctors = function() {
      $location.path('/doctors')
    };

    $scope.showDuties = function() {
      $location.path('/duties')
    };
    $scope.showLogin = function() {
      $location.path('/login');
    }
    $scope.showRegister = function() {
      $location.path('/register');
    }
    $scope.logout = function() {
      $rootScope.user = null;
      AuthService.logout()
        .then(function() {
          $location.path('/login');
        });
    }
  }
]);

angular.module('myApp').controller('adminController', ['$scope', 'AuthService', 'AdminService', '$location',
  function($scope, AuthService, AdminService, $location) {
    AdminService.getUserList().then(function(data) {
      $scope.userList = data;
    });
    $scope.activateUser = function(obj) {
      obj.active = true;
      AdminService.activateUser(obj.username);
    };


  }
]);

angular.module('myApp').controller('clinicController', ['$scope', 'AuthService', 'ClinicService', '$location', 'DutyService','DoctorService', 'VisitService',
  function($scope, AuthService, ClinicService, $location, DutyService, DoctorService, VisitService) {
    ClinicService.getAll().then(function(data) {
      $scope.clinics = data;
    });
    $scope.create = function(name) {
      ClinicService.create(name).then(function() {
        $scope.clinics.push({
          name: name
        })
      });
    };
    $scope.remove = function(clinic) {
      ClinicService.remove(clinic).then(function() {
        console.log($scope.clinics);
        $scope.clinics = $scope.clinics.filter(function(element) {
          if (clinic !== element) return element;
        });
      });
    }
    $scope.showVisits = function(clinic) {
      DutyService.getClinicDuties(clinic._id).then(function(data) {
        $scope.duties = data;
        for(var i = 0; i < $scope.duties.length; i++) {
          var curObj = $scope.duties[i];
         console.log(i);
          DoctorService.getDoctor(curObj.doctorId).then(function(dat) {
           curObj.doctor = dat;
          });
        }
      });
      $scope.addVisit = function(hour) {
        console.log(hour);
        var obj ={
          hour: hour,
          userId: $scope.user.role,
          clinicId: $scope.specificDuties[0].clinicId,
          doctorId: $scope.specificDuties[0].doctorId
        }
       VisitService.create(obj);
      }
    }

    $scope.showSpecificDuties = function(doctor) {
      DutyService.getSpecificDuties(doctor._id) .then(function(data) {
        $scope.specificDuties = data;
        console.log(data);
      })
      
    }

  }

]);
angular.module('myApp').controller('doctorController', ['$scope', 'AuthService', 'DoctorService',
  function($scope, AuthService, DoctorService) {
    DoctorService.getAll().then(function(data) {
      $scope.doctors = data;
    });

    $scope.register = function() {
      AuthService.register($scope.registerForm.username, $scope.registerForm.password, true);
      $scope.doctors.push({
        username: $scope.registerForm.username
      });
    };

  }
]);

angular.module('myApp').controller('dutyController', ['$scope', 'ClinicService', 'DoctorService', 'DutyService',
  function($scope, ClinicService, DoctorService, DutyService) {
    if ($scope.user.role == "Admin") {
      DoctorService.getAll().then(function(data) {
        $scope.doctors = data;

        if (data.length) $scope.selectedDoctor = data[0];
      });
      ClinicService.getAll().then(function(data) {
        $scope.clinics = data;
        if (data.length) $scope.selectedClinic = data[0];
      });
    } else {
      console.log($scope.user._id);
      DutyService.getSpecificDuties($scope.user._id).then(function(data) {
        $scope.duties = data;
        $scope.duties.forEach(function(element) {
          ClinicService.getSpecificClinic(element.clinicId).then(function(data) {
           element.clinicName = data.name;
          });

        });
      });
    }
    $scope.create = function(e) {
      var obj = {
        doctorId: $scope.selectedDoctor._id,
        clinicId: $scope.selectedClinic._id,
        day: $scope.day,
        hourStart: $scope.hourStart,
        hourEnd: $scope.hourEnd
      };
      DutyService.create(obj);
    }

  }
]);

// angular.module('myApp').controller('userController', ['$scope', 'ClinicService', 'DoctorService', 'DutyService',
//   function($scope, ClinicService, DoctorService, DutyService) {
//       ClinicService.getAll().then(function(data) {
//         $scope.clinics = data;
//         if (data.length) $scope.selectedClinic = data[0];
//         conso
//       });
//     $scope.create = function(e) {
//       var obj = {
//         doctorId: $scope.selectedDoctor._id,
//         clinicId: $scope.selectedClinic._id,
//         day: $scope.day,
//         hourStart: $scope.hourStart,
//         hourEnd: $scope.hourEnd
//       };
//       DutyService.create(obj);
//     }

//   }
// ]);
