angular.module('SimpleRESTIonic.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('ItemsModel', function ($http) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'items/';

        function getUrl() {
            // return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };
    })

    .service('CheckinService', function ($http) {
        var service = this;        
        service.checkin= function(data){
             return $http.post('/test', data);//.then(function, errorCallback);
        };    
    })

    .service('AuthService', function($http){

    var self = this;
    // var baseUrl = Backand.getApiUrl() + '/1/objects/';
    self.appName = '';//CONSTS.appName || '';
    self.currentUser = {};

    loadUserDetails();

    function loadUserDetails() {
        // self.currentUser.name = Backand.getUsername();
        // if (self.currentUser.name) {
        //     getCurrentUserInfo()
        //         .then(function (data) {
        //             self.currentUser.details = data;
        //         });
        // }
    }

    self.setAppName = function (newAppName) {
        self.appName = newAppName;
    };

    
    //  API
    

})



.service('CoCs', function ($http, $q) {
  var service = this,
  baseUrl = '/api/coc/';

  function getUrl() {
    return 'http://localhost:5000' + baseUrl;
  }

  service.all = function () {
    return $http.get(getUrl() + "all");
  };

  service.fetch = function (id) {
    return $http.get(getUrl() + "read/" + id);
  };

  service.create = function (object) {
    return $http.post(getUrl() + "create", object);
  };

  service.update = function (id, object) {
    return $http.post(getUrl() + "update/" + id, object);
  };

  service.delete = function (id) {
    return $http.delete(getUrl() + "delete/" + id);
  };
})

.service('Organizations', function ($http) {
  var service = this,
  baseUrl = '/api/organization/';

  var dummy = {
    name: "Test name",
    limit: 174,
    cannotAccept: ["male"]
  };

  function getUrl() {
    return 'http://localhost:5000' + baseUrl;
  }

  service.all = function () {
    //return $http.get(getUrl() + "all");
    return [dummy];
  };

  service.fetch = function (id) {
    return $http.get(getUrl() + "read/" + id);
  };

  service.create = function (object) {
    return $http.post(getUrl() + "create", object);
  };

  service.update = function (id, object) {
    return $http.post(getUrl() + "update/" + id, object);
  };

  service.delete = function (id) {
    return $http.delete(getUrl() + "delete/" + id);
  };
})

.service('Persons', function ($http) {
  var service = this,
  baseUrl = '/api/person/';

  function getUrl() {
    return 'http://localhost:5000' + baseUrl;
  }

  service.all = function () {
    return $http.get(getUrl() + "all");
  };

  service.fetch = function (id) {
    return $http.get(getUrl() + "read/" + id);
  };

  service.create = function (object) {
    return $http.post(getUrl() + "create", object);
  };

  service.update = function (id, object) {
    return $http.post(getUrl() + "update/" + id, object);
  };

  service.delete = function (id) {
    return $http.delete(getUrl() + "delete/" + id);
  };
})

.service('Users', function ($http) {
  var service = this,
      baseUrl = '/api/user/';

  function getUrl() {
    return 'http://localhost:5000' + baseUrl;
  }

  service.all = function () {
    return $http.get(getUrl() + "all");
  };

  service.fetch = function (id) {
    return $http.get(getUrl() + "read/" + id);
  };

  service.create = function (object) {
    return $http.post(getUrl() + "create", object);
  };

  service.update = function (id, object) {
    return $http.post(getUrl() + "update/" + id, object);
  };

  service.delete = function (id) {
    return $http.delete(getUrl() + "delete/" + id);
  };
})

.service('Forms', function ($http) {
  var service = this,
  baseUrl = '/api/form/';

  function getUrl() {
    return 'http://localhost:5000' + baseUrl;
  }

  service.all = function () {
    return $http.get(getUrl() + "all");
  };

  service.fetch = function (id) {
    return $http.get(getUrl() + "read/" + id);
  };

  service.create = function (object) {
    return $http.post(getUrl() + "create", object);
  };

  service.update = function (id, object) {
    return $http.post(getUrl() + "update/" + id, object);
  };

  service.delete = function (id) {
    return $http.delete(getUrl() + "delete/" + id);
  };
})

.service('Questions', function ($http) {
  var service = this,
      baseUrl = '/api/question/';

  function getUrl() {
    return 'http://localhost:5000' + baseUrl;
  }

  service.all = function () {
    return $http.get(getUrl() + "all");
  };

  service.fetch = function (id) {
    return $http.get(getUrl() + "read/" + id);
  };

  service.create = function (object) {
    return $http.post(getUrl() + "create", object);
  };

  service.update = function (id, object) {
    return $http.post(getUrl() + "update/" + id, object);
  };

  service.delete = function (id) {
    return $http.delete(getUrl() + "delete/" + id);
  };
})

.service('Users', function ($http) {
  var service = this;
  var currentUser = {
    "name_info" : "Joe Smith",
    "ssn_info" : "1234566",
    "dob_info" : new Date("2013-01-01T00:00:00.000+0000"),
    role: "admin"
  };

  service.current = function () {
    return currentUser;
  };
});
