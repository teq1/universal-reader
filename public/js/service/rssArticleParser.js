/**
 *
 * @date    22/01/14 21:55
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */



'use strict';

(function(angular) {
    var rssArticleParser = function() {

        /**
         * Prepare date
         */
        var parseDate = function(date){
            if(date){
                // cut timezones
                date = date.substring(0, date.length - 5);
                var parsed = new Date(date);
            }
            return parsed;
        };

        this.prepareArticles = function(data){
            var articles = [];
            angular.forEach(data, function(value, key){
                var prepareDate = (value.publishedDate.length) ? parseDate(value.publishedDate) : null;
                var obj = {
                    title: value.title,
                    link: value.link,
                    publishedDate : prepareDate,
                    testDate: value.publishedDate
                };
                articles.push(obj);
            });
            return articles;
        }

    };
angular.
    module('TabsModule').
    service('rssArticleParser', [rssArticleParser]);

}(angular));