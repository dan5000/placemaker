angular.module('starter.services', [])

    .service('CoC', function ($http) {
        var service = this,
            baseUrl = '/api/coc/';

        function getUrl() {
            return 'http://localhost:5000' + baseUrl;
        }

        service.all = function () {
            return $http.get(getUrl() + "all/");
        };

        service.fetch = function (id) {
            return $http.get(getUrl() + "read/" + id);
        };

        // service.create = function (object) {
        //     return $http.post(getUrl(), object);
        // };

        // service.update = function (id, object) {
        //     return $http.put(getUrlForId(id), object);
        // };

        // service.delete = function (id) {
        //     return $http.delete(getUrlForId(id));
        // };
    });
