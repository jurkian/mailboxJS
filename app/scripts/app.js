'use strict';

var app = angular.module('mailboxApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/dashboard/inbox', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/dashboard/inbox/:emailId', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/dashboard/sent', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/dashboard/sent/:emailId', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/dashboard/trash', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/dashboard/trash/:emailId', {
      templateUrl: 'views/dashboard.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});