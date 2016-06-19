(function() {
	angular.module('app.dashboard')
		.controller('NewEmailCtrl', NewEmailCtrl);

	function NewEmailCtrl($uibModalInstance, Auth, Alert) {
		var vm = this;

		vm.newEmail = {};
		vm.newEmail.close = close;
		vm.newEmail.send = send;

		////////////

		function close() {
			$uibModalInstance.close();
		}

		function send(form) {
			if (form.$valid) {
				Auth.sendEmail(this.to, this.subject, this.message, function(isSent) {

					if (isSent === true) {
						// Hide modal and show confirmation
						$uibModalInstance.close();
						Alert.add('success', 'Email successfully sent');
					} else {
						// Hide modal and show alert
						$uibModalInstance.close();
						Alert.add('danger', 'Problems sending your email');
					}
				});
			}
		}
	}
})();
