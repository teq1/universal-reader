/**
 *
 * @date    22/01/14 01:34
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

'use strict';

(function(angular) {
    var jsonArticleParser = function() {
        var monthsMap = {
            no: {
                0: "januar",
                1: "February",
                2: "mars",
                3: "april",
                4: "mai",
                5: "juni",
                6: "juli",
                7: "august",
                8: "september",
                9: "oktober",
                10: "november",
                11: "desember"
            }
        };

        var monthsMapper = function(month, lang){
            var result = month;
            if(angular.isString(month)){
                angular.forEach(monthsMap[lang], function(value, key){
                    month = month.toLowerCase();
                    if (value === month){
                        result = parseInt(key) + 1;
                    }
                });
            }
            return result;
        };

        var prepareDate = function(date, time){
            var dateArr = date.match(/\S+/g);
            var day = dateArr[0];
            var month = monthsMapper(dateArr[1], "no");
            var year = dateArr[2];
            var newDateString = year + "-" + month + "-" + day + " " + time;
            var newDate = new Date(newDateString);
            return newDate;
        };


        this.prepareArticles = function(data){
            var articles = [];
            if (data){
                angular.forEach(data, function(value){
                    var preparedDate = prepareDate(value.date, value.time)
                    var obj = {
                        title : value.title,
                        description: value.description,
                        link: value.link,
                        category: value.category,
                        date: preparedDate
                    };
                    articles.push(obj);
                });
            }
            return articles;
        }
    };
    angular.
        module('TabsModule').
        service('jsonArticleParser', [jsonArticleParser]);

}(angular));