/**
 *
 * @date    22/01/14 01:34
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

'use strict';

(function(angular) {
    var dataService = function($http, $resource) {

        /**
         * GET JSON
         * @returns {HttpPromise|ServerResponse}
         */
        this.getJson = function(){
            var url = "http://rexxars.com/playground/testfeed/?callback=JSON_CALLBACK";
            return $http.jsonp(url);
        };
        /**
         * GET RSS
         * @returns {HttpPromise|ServerResponse}
         */
        this.getRss = function(){
            var url = "http://www.vg.no/rss/nyfront.php?frontId=1";
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        };

        /**
         * GET LOGS - HOSTS
         * @returns {HttpPromise|ServerResponse}
         */
        this.getLogsHosts = function(){
            var url = "/apache-logs/hosts";
            return $http.get(url);
        };

        /**
         * GET LOGS - REQUESTS
         * @returns {HttpPromise|ServerResponse}
         */
        this.getLogsRequest = function(){
            var url = "/apache-logs/request";
            return $http.get(url);
        };


    };
    angular.
        module('TabsModule').
        service('dataService', ["$http", "$resource", dataService]);

}(angular));