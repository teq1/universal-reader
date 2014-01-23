/**
 *
 * @date    21/01/14 00:13
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

(function(angular){
    var TabsController = function($scope, dataService, jsonArticleParser, rssArticleParser){

        /**
         * Init broadcast
         * @type {string}
         */
        $scope.RELOAD_DATA = "true";
        $scope.$broadcast($scope.RELOAD_DATA);

        /**
         * Tabs
         */
        $scope.VisibleTab = "jsonFeed";
        $scope.showTab = function(tab){
            $scope.VisibleTab = tab;
        };

        /**
         * Articles - Json
         */
        $scope.articles = "";
        dataService.getJson().then(function(data){
            var jsonArticles = data.data;
            $scope.jsonArticles = jsonArticleParser.prepareArticles(jsonArticles);
        });

        /**
         * Articles - RSS
         */
        dataService.getRss().then(function(data){
            var rssArticles = data.data.responseData.feed.entries;
            $scope.rssArticles = rssArticleParser.prepareArticles(rssArticles);
        });

        /**
         * Apache Logs
         */
        dataService.getLogsHosts().then(function(data){
            $scope.apacheLogsHost = data.data;
            console.log(data);
        });
        dataService.getLogsRequest().then(function(data){
            $scope.apacheLogsRequest = data.data;
            console.log(data);
        });


    };
    angular.
        module("TabsModule").
        controller("TabsController", ["$scope", "dataService", "jsonArticleParser", "rssArticleParser", TabsController]);

}(angular));