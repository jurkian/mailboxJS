'use strict';

app.controller('DashboardCtrl', ['$http', 'Alert', 'Auth', function($http, Alert, Auth) {
	
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

			Auth.getInbox(data.email, function(data) {
				inbox = data;
			});
		}
	});
	
}]);