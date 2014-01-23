/**
 *
 * @date    21/01/14 00:08
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

'use strict';

angular.module("TabsModule", ["ngResource"]).
    config(function($routeProvider, $locationProvider) {
               $routeProvider.
                   when("/", {
                            templateUrl: "index",
                            controller: "TabsController"
                        });

               $locationProvider.html5Mode(true);

           });


