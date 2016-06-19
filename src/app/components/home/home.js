var app = angular.module('app');

app.controller('MainCtrl', function($uibModal, Alert) {

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
			templateUrl: 'views/auth/login-modal.html'
		});
	};

	vm.openRegisterModal = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			controller: 'RegisterModalCtrl',
			controllerAs: 'modal',
			templateUrl: 'views/auth/register-modal.html'
		});
	};

});

// Modal instance controllers
// Available when the modal is opened

// Login modal
app.controller('LoginModalCtrl', function($uibModalInstance, Auth, Alert, $location, $timeout) {
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
						}, 400);

					} else {

						// Hide modal and show alert
						$uibModalInstance.close();
						Alert.add('danger', 'Your data is incorrect');
					}
				});
			}
		}
	};
});

// Register modal
app.controller('RegisterModalCtrl', function($uibModalInstance, Auth, Alert) {
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
});