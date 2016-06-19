angular.module('app')
	.factory('Auth', function($http) {

		var _login = function(_email, _password, callback) {
			var isLoggedIn = false;

			// API validation here...

			// Instead, get user's data from local JSON file
			$http.get('api/user.json')
				.then(function(res) {

					if (_email === res.data.email && _password === res.data.password) {
						// User can be logged in
						isLoggedIn = true;

					} else {
						// User's data don't match
						isLoggedIn = false;

					}

					callback(isLoggedIn);

				}, function() {
					// Problems with getting user's data
					callback(false);
				});
		};

		var _register = function(_name, _email, _password, callback) {
			// API validation here...

			$http.get('api/user.json')
				.then(function(res) {
					// Register new user
					// ...

					callback(true);

				}, function() {
					// Problems with registering user
					callback(false);
				});
		};

		// Get user's data
		var _getUser = function(email, password, callback) {
			$http.get('api/user.json')
				.then(function(res) {

					if (res.data.email === email && res.data.password === password) {
						callback(res.data);
					} else {
						callback(false);
					}

				}, function() {

					// Problems with getting user
					callback(false);

				});
		};

		// Get inbox for a particular email
		var _getMailbox = function(email, callback) {
			$http.get('api/user-mailbox.json')
				.then(function(res) {

					if (res.data.email === email) {
						callback(res.data);
					} else {
						callback(false);
					}

				}, function() {

					// Problems with getting user inbox
					callback(false);

				});
		};

		// Send email
		var _sendEmail = function(to, subject, message, callback) {
			// Send email
			// and put it to "sent" list ...

			callback(true);
		};

		return {
			login: _login,
			register: _register,
			getUser: _getUser,
			getMailbox: _getMailbox,
			sendEmail: _sendEmail
		};
	});
