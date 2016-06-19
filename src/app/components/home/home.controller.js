angular.module('app.home')
	.controller('MainCtrl', MainCtrl);

function MainCtrl($uibModal, Alert) {
	var vm = this;

	// Alerts
	vm.alert = Alert;

	vm.closeAlert = function() {
		Alert.clear();
	};

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
}