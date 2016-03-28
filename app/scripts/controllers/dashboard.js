'use strict';

app.controller('DashboardCtrl', ['$http', '$location', '$timeout', 'Alert', 'Auth', '$uibModal', function($http, $location, $timeout, Alert, Auth, $uibModal) {

	var vm = this; // vm stands for ViewModel

	// Alerts
	vm.alert = Alert;

	vm.closeAlert = function() {
		Alert.clear();
	};

	// Sidebar paths change
	vm.urlPath = $location.path();
	vm.searchModel = {};
	vm.searchModel.name = 'findEmailInbox'; // Search for emails in inbox by default

	// Switch view and the behavior of search bar
	// basing on selected tab: inbox, sent or trash
	vm.changeView = function(view) {
    vm.urlPath = view;

    switch (view) {
    	case '/dashboard/sent':
    		vm.searchModel.name = 'findEmailSent'; 
    		break;
    	case '/dashboard/trash':
    		vm.searchModel.name = 'findEmailTrash';
    		break;
    }
	};

	// Get user's data and emails
	var email = 'example@user.com',
			password = 'example';

	vm.user = {};
	vm.user.name = '';
	vm.user.email = '';
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