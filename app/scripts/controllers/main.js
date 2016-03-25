'use strict';

app.controller('MainCtrl', ['$uibModal', function($uibModal) {

  // Open modal with login/register forms
  this.openLoginModal = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      controller: 'LoginModalCtrl',
      controllerAs: 'modal',
      templateUrl: 'views/login-modal.html'
    });
  };

  this.openRegisterModal = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      controller: 'RegisterModalCtrl',
      controllerAs: 'modal',
      templateUrl: 'views/register-modal.html'
    });
  };

}]);

// Modal instance controllers
// Available when the modal is opened

// Login modal
app.controller('LoginModalCtrl', ['$uibModalInstance', 'Auth', function($uibModalInstance, Auth) {
  this.login = {
    submit: function(form) {
      if (form.$valid) {
        Auth.login(this.email, this.password, function(isLoggedIn) {
          if (isLoggedIn === true) {
            alert('You have been logged in!');
          } else {
            alert('Your data is incorrect');
          }
        });
      }
    }
  };

  this.close = function() {
    $uibModalInstance.close();
  };
}]);

// Register modal
app.controller('RegisterModalCtrl', ['$uibModalInstance', 'Auth', function($uibModalInstance, Auth) {
  this.register = {
    submit: function(form) {
      if (form.$valid) {
        Auth.register(this.name, this.email, this.password, function(isRegistered) {
          if (isRegistered === true) {
            alert('You have been registered!');
          }
        });
      }
    }
  };

  this.close = function() {
    $uibModalInstance.close();
  };
}]);
