'use strict';

var app = angular.module('mailboxApp');

app.controller('MainCtrl', ['$uibModal', 'Alert', function($uibModal, Alert) {

	var vm = this; // vm stands for ViewModel

	// Alerts
	vm.alert = Alert;

	vm.closeAlert = function() {
		Alert.clear();
	};

	// MODALS
	// Open modal with login/register forms
	vm.openLoginModal = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			controller: 'LoginModalCtrl',
			controllerAs: 'modal',
			templateUrl: 'views/login-modal.html'
		});
	};

	vm.openRegisterModal = function() {
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
	var vm = this;

	vm.login = {
		close: function() {
			$uibModalInstance.close();
		},
		submit: function(form) {
			if (form.$valid) {
				Auth.login(this.email, this.password, function(isLoggedIn) {
					if (isLoggedIn === true) {

						// Hide modal and redirect to Dashboard
						$uibModalInstance.close();
						Alert.clear();
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
	var vm = this;

	vm.register = {
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
