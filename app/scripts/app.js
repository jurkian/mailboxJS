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
    .otherwise({
      redirectTo: '/'
    });
});