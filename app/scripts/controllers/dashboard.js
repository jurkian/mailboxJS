'use strict';

app.controller('DashboardCtrl', ['$http', 'Alert', function($http, Alert) {
	
	// Alerts
	this.alert = Alert;

	this.closeAlert = function() {
		Alert.clear();
	};
	
}]);