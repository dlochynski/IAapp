angular.module('myApp').factory('AuthService', ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {

    // create user variable
    var user = null;

    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      if (user) return true;
      return false;
    }

    function getUser() {
      if (user) return user;
      return false;
    }

    function login(username, password, doctor) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {
          username: username,
          password: password
        })
        // handle success
        .success(function(data, status) {
          if (status === 200 && data.status) {
            console.log(data);
            user = data.user;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();
      // $http.put('/user/activate',{username: 'test'});
      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function(data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password, doctor) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {
          username: username,
          password: password,
          doctor: doctor
        })
        // handle success
        .success(function(data, status) {
          if (status === 200 && data.status) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      getUser: getUser,
      login: login,
      logout: logout,
      register: register
    });
  }
]);

angular.module('myApp').factory('AdminService', ['$q', '$http',
  function($q, $http) {
    var deferred = $q.defer();

    function getUserList() {
      $http.get('/user/all')
        .success(function(data, status) {
          console.log(data);
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }

    function activateUser(username) {
      var deferred = $q.defer();
      $http.put('/user/activate', {
          username: username
        })
        .success(function(data, status) {
          console.log(data);
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;

    }
    return ({
      getUserList: getUserList,
      activateUser: activateUser

    });

  }
]);

angular.module('myApp').factory('ClinicService', ['$q', '$http',
  function($q, $http) {
    var deferred = $q.defer();

    function getAll() {
      console.log('getting clinics');
      $http.get('/clinic/all')
        .success(function(data, status) {
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }

    function create(name) {
      var deferred = $q.defer();
      $http.post('/clinic/create', {
          name: name
        })
        .success(function(data, status) {
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }

    function remove(clinic) {
      var deferred = $q.defer();

      $http.delete('/clinic/delete/' + clinic.name)
        .success(function(data, status) {
          console.log(status);
          if (status === 200) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }

     function getSpecificClinic(id) {
      var deferred = $q.defer();

      $http.get('/clinic/' + id)
        .success(function(data, status) {
          console.log(status);
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }
    return ({
      create: create,
      getAll: getAll,
      remove: remove,
      getSpecificClinic: getSpecificClinic
    });

  }
]);

angular.module('myApp').factory('DoctorService', ['$q', '$http',
  function($q, $http) {
    var deferred = $q.defer();

    function getAll() {
      $http.get('/user/allDoctors')
        .success(function(data, status) {
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }


    return ({
      getAll: getAll
    });

  }
]);

angular.module('myApp').factory('DutyService', ['$q', '$http',
  function($q, $http) {
    var deferred = $q.defer();


    function create(obj) {
      $http.post('/duty/create', obj)
        .success(function(data, status) {
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }

    function getSpecificDuties(id) {
      $http.get('/duty/doctor/' + id)
        .success(function(data, status) {
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }

    function getClinicDuties(clinicId) {
       $http.get('/duty/clinic/' + clinicId)
        .success(function(data, status) {
          if (status === 200) {
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    }


    return ({
      create: create,
      getSpecificDuties: getSpecificDuties,
      getClinicDuties: getClinicDuties
    });

  }
]);
