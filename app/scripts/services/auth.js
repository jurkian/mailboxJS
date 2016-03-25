'use strict';

app.factory('Auth', ['$http', function ($http) {

  var _login = function(_email, _password, callback) {
  	var isLoggedIn = false;

  	// API validation here...
  	
  	// Instead, get user's data from local JSON file
  	$http.get('models/user.json')
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

  	$http.get('models/user.json')
  	.then(function(res) {
  		// Register new user
  		// ...

  		callback(true);

  	}, function() {
  		// Problems with registering user
  		callback(false);
  	});
  };

  return {
  	login: _login,
  	register: _register
  };
}]);