'use strict';

app.controller('MainCtrl', ['$uibModal', 'Alert', function($uibModal, Alert) {

	// Alerts
	this.alert = Alert;

	this.closeAlert = function() {
		Alert.clear();
	};

	// MODALS
  // Open modal with login/register forms
  this.openLoginModal = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      controller: 'LoginModalCtrl',
      controllerAs: 'modal',
      templateUrl: 'views/login-modal.html'
    });
  };

  this.openRegisterModal = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      controller: 'RegisterModalCtrl',
      controllerAs: 'modal',
      templateUrl: 'views/register-modal.html'
    });
  };

}]);

// Modal instance controllers
// Available when the modal is opened

// Login modal
app.controller('LoginModalCtrl', ['$uibModalInstance', 'Auth', 'Alert', '$location', '$timeout', function($uibModalInstance, Auth, Alert, $location, $timeout) {
  this.login = {
  	close: function() {
  	  $uibModalInstance.close();
  	},
    submit: function(form) {
      if (form.$valid) {
        Auth.login(this.email, this.password, function(isLoggedIn) {
          if (isLoggedIn === true) {

          	// Hide modal and redirect to Dashboard
          	$uibModalInstance.close();
          	$timeout(function() {
          		$location.path('/dashboard');
          	}, 700);

          } else {
          	
          	// Hide modal and show alert
          	$uibModalInstance.close();
          	Alert.add('danger', 'Your data is incorrect');
          }
        });
      }
    }
  };
}]);

// Register modal
app.controller('RegisterModalCtrl', ['$uibModalInstance', 'Auth', 'Alert', function($uibModalInstance, Auth, Alert) {
  this.register = {
  	close: function() {
  	  $uibModalInstance.close();
  	},
    submit: function(form) {
      if (form.$valid) {
        Auth.register(this.name, this.email, this.password, function(isRegistered) {
          if (isRegistered === true) {
          	// Hide modal and show alert (confirmation)
          	$uibModalInstance.close();
          	Alert.add('success', 'You have been registered!');
          }
        });
      }
    }
  };
}]);
