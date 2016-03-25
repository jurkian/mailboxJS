'use strict';

app.controller('MainCtrl', function () {
  this.login = {
  	submit: function(form) {
    	if (form.$valid) {
    		// API validation here...
    		
    		return true;
    	}
    }
  };

  this.register = {
  	submit: function(form) {
  		if (form.$valid) {
  			// API validation here...
  			
  			return true;
  		}
  	}
  };
});