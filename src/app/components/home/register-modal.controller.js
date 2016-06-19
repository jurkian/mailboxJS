(function() {
	angular.module('app.home')
		.controller('RegisterModalCtrl', RegisterModalCtrl);

	function RegisterModalCtrl($uibModalInstance, Auth, Alert) {
		var vm = this;

		vm.register = {};
		vm.register.close = close;
		vm.register.submit = submit;

		////////////

		function close() {
			$uibModalInstance.close();
		}

		function submit(form) {
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
	}
})();
