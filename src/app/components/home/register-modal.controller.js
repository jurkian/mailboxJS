angular.module('app.home')
	.controller('RegisterModalCtrl', RegisterModalCtrl);

function RegisterModalCtrl($uibModalInstance, Auth, Alert) {
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
}