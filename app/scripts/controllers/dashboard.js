'use strict';

app.controller('DashboardCtrl', ['$http', '$scope', '$location', '$timeout', 'Alert', 'Auth', function($http, $scope, $location, $timeout, Alert, Auth) {

	// Alerts
	this.alert = Alert;

	this.closeAlert = function() {
		Alert.clear();
	};

	// Sidebar paths change
	this.urlPath = $location.path();

	this.changeView = function(view) {
    this.urlPath = view;
	};


	// Get user's data and emails
	var email = 'example@user.com',
	password = 'example';

	$scope.user = {};
	$scope.user.name = '';
	$scope.user.email = '';
	$scope.inbox = '';

	Auth.getUser(email, password, function(userData) {
		if (userData !== false) {
			$scope.user.name = userData.name;
			$scope.user.email = userData.email;

			Auth.getInbox(userData.email, function(inboxData) {
				$scope.inbox = inboxData.messages;
				authSuccess();
			});

		} else {
			authFailed();
		}
	});

	// Auth failed: show Alert and redirect to main page
	var authFailed = function() {
		Alert.add('danger', 'Authorization failed');
		
		$timeout(function() {
			$location.path('/');
		}, 1000);
	};

	// The moment when the user is authorized
	var authSuccess = function() {

	};

}]);