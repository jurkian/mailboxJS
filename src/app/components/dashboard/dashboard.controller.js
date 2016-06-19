(function() {
	angular.module('app.dashboard')
		.controller('DashboardCtrl', DashboardCtrl);

	function DashboardCtrl($routeParams, $location, $timeout, Alert, Auth, $uibModal) {
		var vm = this;

		// Alerts
		vm.alert = Alert;
		vm.closeAlert = Alert.clear;

		vm.user = {};
		vm.mailbox = '';
		vm.openNewEmailModal = openNewEmailModal;

		////////////

		// Get user's data and emails
		var email = 'example@user.com',
			password = 'example';

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
		function authFailed() {
			Alert.add('danger', 'Authorization failed');

			$timeout(function() {
				$location.path('/');
			}, 1000);
		}

		// The moment when the user is authorized
		function authSuccess() {

			var isSingleEmailView = new RegExp(/dashboard\/[a-z]+\/[0-9]+$/);

			// Get current path for view switch
			// If path matches "dashboard/.../ID" load single email view
			if (isSingleEmailView.test($location.path())) {

				// Simplify the path for switch
				vm.viewToLoad = 'singleEmail';

				// Get category and email ID for single email view
				var emailId = $routeParams.emailId;
				var dashboardView = $routeParams.dbTab; // /dashboard/tab/id

				// (-1 because email IDs in address start from 1)
				var thisEmail = vm.mailbox[dashboardView][emailId - 1];

				vm.emailFrom = thisEmail.from;
				vm.emailTitle = thisEmail.title;
				vm.emailDate = thisEmail.date;
				vm.emailMessage = thisEmail.message;

			} else {
				// If target is one of the sidebar tabs - inbox, sent, trash
				// Generate a dynamic view basing on path
				vm.viewToLoad = 'sidebarTab';
				vm.tabName = '';
				vm.tabTitle = '';

				switch ($location.path()) {
					case '/dashboard':
						vm.tabName = 'inbox';
						vm.tabTitle = 'Inbox';
						break;

					case '/dashboard/sent':
						vm.tabName = 'sent';
						vm.tabTitle = 'Sent';
						break;

					case '/dashboard/trash':
						vm.tabName = 'trash';
						vm.tabTitle = 'Trash';
						break;
				}

				vm.tabData = vm.mailbox[vm.tabName];

				// Activate pagination
				vm.totalItems = vm.tabData.length;
				vm.currentPage = 1;
				vm.itemsPerPage = 5;
				vm.maxSize = 5;
			}
		}

		// Create new email modal
		function openNewEmailModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				controller: 'NewEmailCtrl',
				controllerAs: 'modal',
				templateUrl: 'views/auth/new-email-modal.html'
			});
		}
	}
})();
