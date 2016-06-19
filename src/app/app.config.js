angular.module('app')
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home/home.html'
			})
			.when('/dashboard', {
				templateUrl: 'views/dashboard/dashboard.html'
			})
			.when('/dashboard/:dbTab', {
				templateUrl: 'views/dashboard/dashboard.html'
			})
			.when('/dashboard/:dbTab/:emailId', {
				templateUrl: 'views/dashboard/dashboard.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});