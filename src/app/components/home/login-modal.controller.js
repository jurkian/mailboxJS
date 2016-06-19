angular.module('app.home')
	.controller('LoginModalCtrl', LoginModalCtrl);

function LoginModalCtrl($uibModalInstance, Auth, Alert, $location, $timeout) {
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
}