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
    .service('Person', function ($http) {
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
        service.read = function (id, object) {
            return $http.get(getUrl() + "read/" + id, object);
        };

        service.delete = function (id) {
            return $http.delete(getUrl() + "delete/" + id);
        };
    })
    .service('COC', function ($http) {
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
        service.read = function (id, object) {
            return $http.get(getUrl() + "read/" + id, object);
        };

        service.delete = function (id) {
            return $http.delete(getUrl() + "delete/" + id);
        };
    })
    .service('User', function ($http) {
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
        service.read = function (id, object) {
            return $http.get(getUrl() + "read/" + id, object);
        };
        service.delete = function (id) {
            return $http.delete(getUrl() + "delete/" + id);
        };
    })
    .service('Form', function ($http) {
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
        service.read = function (id, object) {
            return $http.get(getUrl() + "read/" + id, object);
        };

        service.delete = function (id) {
            return $http.delete(getUrl() + "delete/" + id);
        };
    })
    .service('Question', function ($http) {
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
        service.read = function (id, object) {
            return $http.get(getUrl() + "read/" + id, object);
        };

        service.update = function (id, object) {
            return $http.post(getUrl() + "update/" + id, object);
        };

        service.delete = function (id) {
            return $http.delete(getUrl() + "delete/" + id);
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

    self.signIn = function (username, password, appName) {

    };

    function getCurrentUserInfo() {
        return $http({
            method: 'GET',
            url: baseUrl + "users",
            params: {
                filter: JSON.stringify([{
                    fieldName: "email",
                    operator: "contains",
                    value: self.currentUser.name
                }])
            }
        }).then(function (response) {
            if (response.data && response.data.data && response.data.data.length == 1)
                return response.data.data[0];
        });
    }

});
