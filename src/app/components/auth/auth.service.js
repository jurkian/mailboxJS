(function() {
	angular.module('app')
		.factory('Auth', Auth);

	function Auth($http) {
		var alert = {};

		var factory = {
			login: login,
			register: register,
			getUser: getUser,
			getMailbox: getMailbox,
			sendEmail: sendEmail
		};

		return factory;

		////////////

		function login(email, password, callback) {
			var isLoggedIn = false;

			// API validation here...

			// Instead, get user's data from local JSON file
			$http.get('api/user.json')
			.then(function(res) {

				if (email === res.data.email && password === res.data.password) {
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
		}

		function register(name, email, password, callback) {
			// API validation here...

			$http.get('api/user.json')
			.then(function(res) {
				// Register new user ...

				callback(true);

			}, function() {
				// Problems with registering user
				callback(false);
			});
		}

		// Get user's data
		function getUser(email, password, callback) {
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
		}

		// Get inbox for a particular email
		function getMailbox(email, callback) {
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
		}

		// Send email
		function sendEmail(to, subject, message, callback) {
			// Put it to "sent" list ...

			callback(true);
		}
	}
})();
