'use strict';

app.controller('DashboardCtrl', ['$http', '$scope', '$location', '$timeout', 'Alert', 'Auth', '$uibModal', function($http, $scope, $location, $timeout, Alert, Auth, $uibModal) {

	// Alerts
	this.alert = Alert;

	this.closeAlert = function() {
		Alert.clear();
	};

	// Sidebar paths change
	this.urlPath = $location.path();
	$scope.searchModel = {};
	$scope.searchModel.name = 'findEmailInbox';

	// Switch view and the behavior of search bar
	// basing on selected option
	this.changeView = function(view) {
    this.urlPath = view;

    switch (view) {
    	case '/dashboard/sent':
    		$scope.searchModel.name = 'findEmailSent'; 
    		break;
    	case '/dashboard/trash':
    		$scope.searchModel.name = 'findEmailTrash';
    		break;
    }
	};

	// Get user's data and emails
	var email = 'example@user.com',
			password = 'example';

	$scope.user = {};
	$scope.user.name = '';
	$scope.user.email = '';
	$scope.mailbox = '';

	Auth.getUser(email, password, function(userData) {
		if (userData !== false) {
			$scope.user.name = userData.name;
			$scope.user.email = userData.email;

			Auth.getMailbox(userData.email, function(mailboxData) {
				$scope.mailbox = mailboxData;
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
  this.openNewEmailModal = function() {
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
  this.newEmail = {
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