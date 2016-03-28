'use strict';

app.controller('DashboardCtrl', ['$http', '$routeParams', '$location', '$timeout', 'Alert', 'Auth', '$uibModal', function($http, $routeParams, $location, $timeout, Alert, Auth, $uibModal) {

	var vm = this; // vm stands for ViewModel

	// Alerts
	vm.alert = Alert;

	vm.closeAlert = function() {
		Alert.clear();
	};

	// Get user's data and emails
	var email = 'example@user.com',
			password = 'example';

	vm.user = {};
	vm.mailbox = '';

	Auth.getUser(email, password, function(userData) {
		if (userData !== false) {
			vm.user.name = userData.name;
			vm.user.email = userData.email;

			Auth.getMailbox(userData.email, function(mailboxData) {
				vm.mailbox = mailboxData;
				authSuccess();
			});

		} else {
			authFailed();
		}
	});

	// Auth failed: show Alert and redirect to main page
	var authFailed = function() {
		Alert.add('danger', 'Authorization failed');
		
		$timeout(function() {
			$location.path('/');
		}, 1000);
	};

	// The moment when the user is authorized
	var authSuccess = function() {
		
		var isSingleEmailView = new RegExp(/dashboard\/[a-z]+\/[0-9]+$/);

		// Get current path for view switch
		// If path matches "dashboard/.../ID" load single email view
		if (isSingleEmailView.test($location.path())) {

			// Simplify the path for switch
			vm.urlPath = '/dashboard/email';

			// Get category and email ID for single email view
			var emailId = $routeParams.emailId;
			var dashboardView = $routeParams.dbTab; // /dashboard/tab/id

			// (-1 because email IDs in address start from 1)
			var thisEmail = vm.mailbox[dashboardView][emailId-1];

			vm.emailFrom = thisEmail.from;
			vm.emailTitle = thisEmail.title;
			vm.emailDate = thisEmail.date;
			vm.emailMessage = thisEmail.message;

		} else {
			vm.urlPath = $location.path();
		}

		// Activate search box - in inbox by default
		vm.searchModel = {};
		vm.searchModel.name = 'findEmailInbox';
	};

	// Create new email modal
  vm.openNewEmailModal = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      controller: 'NewEmailCtrl',
      controllerAs: 'modal',
      templateUrl: 'views/new-email-modal.html'
    });
  };

}]);

// New email controller
app.controller('NewEmailCtrl', ['$uibModalInstance', 'Auth', 'Alert', function($uibModalInstance, Auth, Alert) {
	var vm = this;

  vm.newEmail = {
  	close: function() {
  	  $uibModalInstance.close();
  	},
    send: function(form) {
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
  };
}]);