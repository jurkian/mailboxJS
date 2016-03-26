'use strict';

app.controller('DashboardCtrl', ['$http', '$location', '$timeout', 'Alert', 'Auth', function($http, $location, $timeout, Alert, Auth) {
	
	// Alerts
	this.alert = Alert;

	this.closeAlert = function() {
		Alert.clear();
	};

	// Get user's data and emails
	var email = 'example@user.com',
	password = 'example',
	user = '',
	inbox = '';

	Auth.getUser(email, password, function(data) {
		if (data !== false) {
			user = data;

			Auth.getInbox(user.email, function(data) {
				inbox = data;
				authSuccess();
			});

		} else {
			authFailed();
		}
	});

	var authFailed = function() {
		// Auth failed: show Alert and redirect to main page
		Alert.add('danger', 'Authorization failed');
		
		$timeout(function() {
			$location.path('/');
		}, 1000);
	};

	// The moment when the user is authorized
	var authSuccess = function() {
		
	};
	
}]);