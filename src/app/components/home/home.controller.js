(function() {
	angular.module('app.home')
		.controller('MainCtrl', MainCtrl);

	function MainCtrl($uibModal, Alert) {
		var vm = this;

		// Alerts
		vm.alert = Alert;
		vm.closeAlert = Alert.clear;

		vm.openLoginModal = openLoginModal;
		vm.openRegisterModal = openRegisterModal;

		////////////

		function openLoginModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				controller: 'LoginModalCtrl',
				controllerAs: 'modal',
				templateUrl: 'views/auth/login-modal.html'
			});
		}

		function openRegisterModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				controller: 'RegisterModalCtrl',
				controllerAs: 'modal',
				templateUrl: 'views/auth/register-modal.html'
			});
		}
	}
})();
