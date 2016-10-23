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

    .service('LoginService', function () {
        var service = this;


        service.anonymousLogin= function(){
            // don't have to do anything here,
            // because we set app token att app.js
        }

    
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
