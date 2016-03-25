'use strict';

app.controller('MainCtrl', ['Auth', function(Auth) {

  this.login = {
    submit: function(form) {
      if (form.$valid) {

        Auth.login(this.email, this.password, function(isLoggedIn) {

          if (isLoggedIn === true) {
            alert('You have been logged in!');
          } else {
            alert('Your data is incorrect');
          }

        });
      }
    }
  };

  this.register = {
    submit: function(form) {
      if (form.$valid) {
        return true;
      }
    }
  };
}]);
